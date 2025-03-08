import React, { useState } from 'react';
import '../styles/Newsletter.css';
import { FaEnvelope } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="newsletter-container" id="newsletter">
      <div className="newsletter-content">
        <div className="newsletter-icon">
          <FaEnvelope />
        </div>
        <div className="newsletter-text">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest fitness tips, workout plans, and exclusive offers directly to your inbox.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {subscribed && (
          <div className="subscription-message">
            Thank you for subscribing! You'll receive our updates soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter; 