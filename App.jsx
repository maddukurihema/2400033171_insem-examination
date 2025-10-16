import React, { useState } from "react";
import "./App.css";
import { ShoppingCart, User, Home, MapPin, Package } from "lucide-react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products = [
    {
      name: "Tribal Painting",
      price: 800,
      img: "https://i.pinimg.com/736x/32/dc/fd/32dcfd2648bc49567b33a827b8c581ce.jpg",
    },
    {
      name: "Handwoven Basket",
      price: 350,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjsta5gP-ol8TPOvB4RdIkdNQ7WYzM1SWoqg&s",
    },
    {
      name: "Clay Pot",
      price: 250,
      img: "https://www.shutterstock.com/image-photo/different-pottery-products-traditional-fair-600nw-2325690337.jpg",
    },
    {
      name: "Beaded Necklace",
      price: 450,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-4Sc_-yuJ1brHJMZ-zCrt6AMpFV8sv7iUg&s",
    },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleOrder = (e) => {
    e.preventDefault();
    if (!address || !deliveryDate) {
      alert("Please fill all details.");
      return;
    }
    setOrderPlaced(true);
    setPage("tracking");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Please enter your name to login.");
      return;
    }
    setLoggedIn(true);
    alert(`Welcome, ${userName}!`);
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h1>🪶 Tribal eKart</h1>
          <p>Empowering Tribal Hands 👐</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input type="tel" placeholder="Phone number" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1 className="logo" onClick={() => setPage("home")}>
          🪶 Tribal eKart
        </h1>
        <nav>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("cart")}>Cart ({cart.length})</button>
          <button onClick={() => setPage("checkout")}>Checkout</button>
          <button onClick={() => setPage("tracking")}>Track</button>
        </nav>
        <div className="header-icons">
          <User />
          <span>{userName}</span>
        </div>
      </header>

      {/* Home */}
      {page === "home" && (
        <section className="home">
          <div className="banner">
            <h2>Empowering Tribal Hands 👐</h2>
            <p>Shop authentic handmade crafts directly from tribal artisans.</p>
          </div>
          <div className="product-grid">
            {products.map((p, i) => (
              <div className="product-card" key={i}>
                <img src={p.img} alt={p.name} />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <button onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cart */}
      {page === "cart" && (
        <section className="cart-page">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div className="cart-item" key={i}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}
              <h3>Total: ₹{total}</h3>
              <button onClick={() => setPage("checkout")}>Proceed to Checkout</button>
            </>
          )}
        </section>
      )}

      {/* Checkout */}
      {page === "checkout" && (
        <section className="checkout-page">
          <h2>Shipping & Delivery</h2>
          <form onSubmit={handleOrder}>
            <textarea
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
            <label>Expected Delivery Date:</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
            <div className="summary">
              <h3>Order Summary</h3>
              <p>Items: {cart.length}</p>
              <p>Total Price: ₹{total}</p>
            </div>
            <button type="submit">Place Order</button>
          </form>
        </section>
      )}

      {/* Tracking */}
      {page === "tracking" && orderPlaced && (
        <section className="tracking-page">
          <h2>Order Tracking</h2>
          <div className="tracking-timeline">
            <div className="step completed">
              <Home /> <p>Order Placed</p>
            </div>
            <div className="step completed">
              <Package /> <p>Shipped</p>
            </div>
            <div className="step active">
              <MapPin /> <p>Out for Delivery</p>
            </div>
            <div className="step">
              <User /> <p>Delivered (Expected: {deliveryDate})</p>
            </div>
          </div>
          <p>Your package will arrive soon at:</p>
          <p className="address">{address}</p>
        </section>
      )}

      <footer className="footer">
        <p>© 2025 Tribal eKart | Made with ❤️ for tribal empowerment</p>
      </footer>
    </div>
  );
}

export default App;
