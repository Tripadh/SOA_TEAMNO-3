package com.apothecary.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ApothecaryAuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApothecaryAuthServiceApplication.class, args);
    }
}
