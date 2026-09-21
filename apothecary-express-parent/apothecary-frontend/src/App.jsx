import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('medicines'); // medicines, cart, orders, auth
  const [authMode, setAuthMode] = useState('login'); // login, register
  
  // Auth Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchMedicines();
    if (token) fetchOrders();
  }, [token]);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${API_URL}/medicines`);
      setMedicines(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders/my`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (authMode === 'login') {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password });
        finishAuth(res.data);
      } else {
        const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
        finishAuth(res.data);
      }
    } catch (e) {
      alert(authMode === 'login' ? 'Login failed. Check credentials.' : 'Registration failed. Email might exist.');
    }
  };

  const finishAuth = (data) => {
    setToken(data.token);
    setRole(data.user.role);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    setView('medicines');
    setPassword('');
  };

  const logout = () => {
    setToken('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setCart([]);
    setView('medicines');
  };

  const addToCart = (medicine) => {
    const existing = cart.find(i => i.medicineId === medicine.medicineId);
    if (existing) {
      setCart(cart.map(i => i.medicineId === medicine.medicineId ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { medicineId: medicine.medicineId, name: medicine.name, price: medicine.price, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(i => i.medicineId !== medicineId));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    const items = cart.map(i => ({ medicineId: i.medicineId, quantity: i.quantity }));
    try {
      await axios.post(`${API_URL}/orders`, { items }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order placed successfully!');
      setCart([]);
      fetchMedicines();
      fetchOrders();
      setView('orders');
    } catch (e) {
      alert('Failed to place order. ' + (e.response?.data?.message || ''));
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo-icon">💊</span>
          <h1>Apothecary Express</h1>
        </div>
        <div className="nav-links">
          <button className={`nav-btn ${view === 'medicines' ? 'active' : ''}`} onClick={() => setView('medicines')}>Catalog</button>
          {token && (
            <>
              <button className={`nav-btn cart-btn ${view === 'cart' ? 'active' : ''}`} onClick={() => setView('cart')}>
                Cart <span className="badge">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </button>
              <button className={`nav-btn ${view === 'orders' ? 'active' : ''}`} onClick={() => setView('orders')}>My Orders</button>
              <button className="nav-btn logout-btn" onClick={logout}>Logout</button>
            </>
          )}
          {!token && (
            <button className={`nav-btn login-btn ${view === 'auth' ? 'active' : ''}`} onClick={() => setView('auth')}>Sign In</button>
          )}
        </div>
      </nav>

      <main className="main-content">
        {view === 'auth' && (
          <div className="auth-container">
            <div className="auth-card">
              <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="auth-subtitle">
                {authMode === 'login' ? 'Enter your details to access your account' : 'Join Apothecary Express today'}
              </p>
              <form onSubmit={handleAuth} className="auth-form">
                {authMode === 'register' && (
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required />
                  </div>
                )}
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" required />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                </div>
                <button type="submit" className="primary-btn full-width">
                  {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              </form>
              <div className="auth-switch">
                {authMode === 'login' ? (
                  <p>Don't have an account? <span onClick={() => setAuthMode('register')}>Sign up</span></p>
                ) : (
                  <p>Already have an account? <span onClick={() => setAuthMode('login')}>Sign in</span></p>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'medicines' && (
          <div className="page-container fade-in">
            <div className="page-header">
              <h2>Medicine Catalog</h2>
              <p>Browse our extensive collection of pharmaceutical products.</p>
            </div>
            <div className="catalog-grid">
              {medicines.map(m => (
                <div key={m.medicineId} className="medicine-card">
                  <div className="card-header">
                    <span className="category-tag">{m.category}</span>
                    {m.prescriptionRequired && <span className="rx-tag">Rx</span>}
                  </div>
                  <h3>{m.name}</h3>
                  <div className="card-details">
                    <div className="price-tag">₹{m.price.toFixed(2)}</div>
                    <div className={`stock-status ${m.stockQuantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {m.stockQuantity > 0 ? `${m.stockQuantity} in stock` : 'Out of Stock'}
                    </div>
                  </div>
                  {token ? (
                    <button 
                      className={`primary-btn add-cart-btn ${m.stockQuantity === 0 ? 'disabled' : ''}`} 
                      onClick={() => addToCart(m)}
                      disabled={m.stockQuantity === 0}
                    >
                      {m.stockQuantity === 0 ? 'Unavailable' : 'Add to Cart'}
                    </button>
                  ) : (
                    <button className="outline-btn add-cart-btn" onClick={() => setView('auth')}>
                      Login to Buy
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="page-container fade-in">
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any medicines yet.</p>
                <button className="primary-btn" onClick={() => setView('medicines')}>Browse Catalog</button>
              </div>
            ) : (
              <div className="cart-layout">
                <div className="cart-items">
                  {cart.map(i => (
                    <div key={i.medicineId} className="cart-item">
                      <div className="item-info">
                        <h4>{i.name}</h4>
                        <p className="item-price">₹{i.price.toFixed(2)}</p>
                      </div>
                      <div className="item-actions">
                        <span className="quantity-badge">Qty: {i.quantity}</span>
                        <div className="item-total">₹{(i.price * i.quantity).toFixed(2)}</div>
                        <button className="remove-btn" onClick={() => removeFromCart(i.medicineId)}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                  <button className="primary-btn checkout-btn" onClick={placeOrder}>Confirm & Place Order</button>
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'orders' && (
          <div className="page-container fade-in">
            <h2>My Order History</h2>
            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No orders yet</h3>
                <p>When you place orders, they will appear here.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(o => (
                  <div key={o.orderId} className="order-card">
                    <div className="order-header">
                      <div>
                        <span className="order-id">Order #{o.orderId}</span>
                        <span className="order-date">{new Date(o.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className={`status-badge status-${o.orderStatus.toLowerCase()}`}>{o.orderStatus}</span>
                    </div>
                    <div className="order-body">
                      <ul className="order-items-list">
                        {o.items.map(i => (
                          <li key={i.orderItemId}>
                            <span className="item-name">{i.medicineName}</span>
                            <span className="item-qty-price">
                              {i.quantity} x ₹{i.unitPrice.toFixed(2)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-footer">
                      <span>Total Amount:</span>
                      <span className="order-total">₹{o.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
