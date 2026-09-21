package com.apothecary.gateway.filter;

import com.apothecary.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            
            String path = exchange.getRequest().getURI().getPath();
            
            // Public endpoints that don't require authentication
            if (isPublicEndpoint(path, exchange.getRequest().getMethod().name())) {
                return chain.filter(exchange);
            }

            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return onError(exchange, "Missing authorization header", HttpStatus.UNAUTHORIZED);
            }

            String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                authHeader = authHeader.substring(7);
            } else {
                return onError(exchange, "Invalid authorization header format", HttpStatus.UNAUTHORIZED);
            }

            try {
                jwtUtil.validateToken(authHeader);
                Claims claims = jwtUtil.getClaims(authHeader);
                
                // Extract role and userId from claims and add them as headers for downstream services
                String role = claims.get("role", String.class);
                Long userId = claims.get("userId", Long.class);

                // Admin specific endpoints protection
                if (isAdminOnlyEndpoint(path, exchange.getRequest().getMethod().name()) && !"ADMIN".equals(role)) {
                    return onError(exchange, "Admin access required", HttpStatus.FORBIDDEN);
                }

                ServerHttpRequest request = exchange.getRequest().mutate()
                        .header("X-User-Id", String.valueOf(userId))
                        .header("X-User-Role", role)
                        .header("X-User-Email", claims.getSubject())
                        .build();
                
                return chain.filter(exchange.mutate().request(request).build());

            } catch (Exception e) {
                return onError(exchange, "Unauthorized access to application", HttpStatus.UNAUTHORIZED);
            }
        });
    }
    
    private boolean isPublicEndpoint(String path, String method) {
        if (path.startsWith("/api/auth/")) return true;
        if (path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui")) return true;
        // Medicines GET APIs are public
        if (path.startsWith("/api/medicines") && "GET".equalsIgnoreCase(method)) return true;
        return false;
    }
    
    private boolean isAdminOnlyEndpoint(String path, String method) {
        if (path.startsWith("/api/medicines") && ("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method) || "PATCH".equalsIgnoreCase(method))) {
            return true;
        }
        if (path.startsWith("/api/orders") && "PATCH".equalsIgnoreCase(method)) {
            return true;
        }
        return false;
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        exchange.getResponse().setStatusCode(httpStatus);
        return exchange.getResponse().setComplete();
    }

    public static class Config {
    }
}
