import React, { useState } from 'react';
import { Mail, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export default function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setIsSubmitted(true);
    if (onSubscribe) {
      onSubscribe(email);
    }
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="newsletter-card">
        <div className="newsletter-glow" aria-hidden="true" />
        
        <div className="newsletter-badge">
          <Sparkles size={14} />
          <span>Bi-Weekly Curated Dispatch</span>
        </div>

        <h2 className="newsletter-title">
          Stay Ahead of Modern Web &amp; Architecture
        </h2>

        <p className="newsletter-desc">
          Get high-signal frontend insights, deep dives into React, and thoughtful UI design systems 
          delivered directly to your inbox. No marketing spam, strictly quality reading.
        </p>

        {isSubmitted ? (
          <div className="newsletter-success">
            <CheckCircle size={24} className="newsletter-success-icon" />
            <div>
              <h4>Welcome aboard!</h4>
              <p>You're subscribed to Varshini Blog Dispatch. Check your inbox soon.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <Mail size={18} className="newsletter-mail-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter your email address..."
                className="newsletter-input"
                aria-label="Email address"
                required
              />
              <button type="submit" className="newsletter-submit-btn">
                Subscribe Free
              </button>
            </div>
            {error && <p className="newsletter-error">{error}</p>}
          </form>
        )}

        <div className="newsletter-trust-row">
          <div className="trust-item">
            <ShieldCheck size={16} />
            <span>Strict zero-spam policy</span>
          </div>
          <span className="trust-dot">•</span>
          <div className="trust-item">
            <span>15,000+ active subscribers</span>
          </div>
          <span className="trust-dot">•</span>
          <div className="trust-item">
            <span>Unsubscribe with 1-click anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
