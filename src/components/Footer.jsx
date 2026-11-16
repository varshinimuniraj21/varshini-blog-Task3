import React from 'react';
import { 
  Sparkles, 
  Mail, 
  Rss, 
  ArrowUp, 
  Heart
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export default function Footer({ onCategoryClick, onScrollToTop }) {
  const categories = [
    'Technology',
    'UI/UX Design',
    'AI & Innovation',
    'Web Development',
    'Career & Growth'
  ];

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-top-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="logo-icon-wrap">
              <Sparkles size={18} className="logo-sparkle" />
            </div>
            <span className="logo-name">Varshini<span className="accent-dot">.</span>Blog</span>
          </div>

          <p className="footer-tagline">
            A premium editorial publication dedicated to frontend engineering, generative UI, 
            design systems, and software craftsmanship. Built for forward-thinking developers.
          </p>

          <div className="footer-social-row">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-btn" 
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <TwitterIcon size={18} />
            </a>
            <a 
              href="mailto:contact@varshiniblog.dev" 
              className="social-icon-btn" 
              title="Email Newsletter"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); handleNavClick('top'); }} 
              className="social-icon-btn" 
              title="RSS Feed"
              aria-label="RSS Feed"
            >
              <Rss size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-link-list">
            <li>
              <button type="button" onClick={() => handleNavClick('top')} className="footer-link-btn">
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNavClick('featured')} className="footer-link-btn">
                Featured Spotlight
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNavClick('articles')} className="footer-link-btn">
                All Articles
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNavClick('about')} className="footer-link-btn">
                About the Author
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleNavClick('newsletter')} className="footer-link-btn">
                Subscribe Newsletter
              </button>
            </li>
          </ul>
        </div>

        {/* Topics Column */}
        <div className="footer-col">
          <h4 className="footer-col-title">Topics &amp; Series</h4>
          <ul className="footer-link-list">
            {categories.map((cat) => (
              <li key={cat}>
                <button 
                  type="button" 
                  onClick={() => {
                    if (onCategoryClick) onCategoryClick(cat);
                    handleNavClick('articles');
                  }} 
                  className="footer-link-btn"
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack / Engineering Info */}
        <div className="footer-col">
          <h4 className="footer-col-title">Engineering Stack</h4>
          <p className="footer-meta-text">
            Engineered with React 19, modern Vite 8, vanilla CSS custom properties, and modern vector icons.
          </p>
          <div className="stack-badges-wrap">
            <span className="stack-badge">React 19</span>
            <span className="stack-badge">Vite</span>
            <span className="stack-badge">ES6+</span>
            <span className="stack-badge">Fluid CSS</span>
          </div>
          <button 
            type="button" 
            onClick={onScrollToTop} 
            className="back-to-top-btn"
            title="Scroll back to top"
          >
            <ArrowUp size={16} />
            <span>Back to Top</span>
          </button>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="footer-bottom-bar">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} <strong>Varshini Blog</strong>. All rights reserved. 
          Built with <Heart size={13} className="footer-heart" /> for the global developer community.
        </p>

        <div className="footer-legal-links">
          <span className="legal-item">Privacy Policy</span>
          <span className="legal-dot">•</span>
          <span className="legal-item">Terms of Service</span>
          <span className="legal-dot">•</span>
          <span className="legal-item">RSS Feed</span>
        </div>
      </div>
    </footer>
  );
}
