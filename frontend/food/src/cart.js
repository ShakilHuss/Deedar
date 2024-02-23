import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function ShoppingCart() {
  const navigate = useNavigate();

  // Function to handle navigation for different actions
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="shopping-cart-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Left Side - User Actions */}
      <div className="user-actions">
        <button onClick={() => handleNavigate('/login')} style={{ display: 'block', marginBottom: '10px' }}>Log In</button>
        <button onClick={() => handleNavigate('/create-account')} style={{ display: 'block', marginBottom: '10px' }}>Create Account</button>
        <button onClick={() => handleNavigate('/checkout-guest')} style={{ display: 'block', marginBottom: '10px' }}>Checkout as Guest</button>
      </div>

      {/* Right Side - Shopping Cart and Checkout */}
      <div className="cart-and-checkout">
        <div className="shopping-cart" style={{ marginBottom: '20px' }}>
          {/* Here would be your shopping cart summary */}
          <p>Shopping Cart Summary</p>
        </div>
        <button onClick={() => handleNavigate('/checkout')}>Checkout</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
