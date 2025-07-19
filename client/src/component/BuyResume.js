
import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const BuyResume = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/payment/create-checkout-session`, { email });
      window.location.href = res.data.url;
    } catch (err) {
      alert('Error starting payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="buy-container">
      <h2>💳 Buy My Resume</h2>
      <p className="buy-description">
        Get my professional resume for just <strong>$2.99</strong>.  
        Enter your email to receive the download link after payment.
      </p>

      <input
        type="email"
        className="buy-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <button className="buy-btn" onClick={handlePurchase} disabled={loading}>
        {loading ? 'Redirecting...' : 'Pay $2.99'}
      </button>
    </div>
  );
};

export default BuyResume;

