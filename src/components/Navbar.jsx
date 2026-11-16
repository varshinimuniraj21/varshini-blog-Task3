import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Menu, X, Search, Bookmark, Send } from 'lucide-react';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onSearchClick, 
  savedCount = 0, 
  onOpenSaved,
  activeFilter 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }} 
          className="brand-logo"
        >
          <div className="logo-icon-wrap">
            <Sparkles size={20} className="logo-sparkle" />
          </div>
          <div className="logo-text-group">
            <span className="logo-name">Varshini<span className="accent-dot">.</span>Blog</span>
            <span className="logo-badge">EDITORIAL</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button 
            type="button" 
            onClick={() => handleNavClick('top')} 
            className="nav-link"
          >
            Home
          </button>
          <button 
            type="button" 
            onClick={() => handleNavClick('featured')} 
            className="nav-link"
          >
            Featured
          </button>
          <button 
            type="button" 
            onClick={() => handleNavClick('articles')} 
            className="nav-link"
          >
            Articles
          </button>
          <button 
            type="button" 
            onClick={() => handleNavClick('about')} 
            className="nav-link"
          >
            About
          </button>
          <button 
            type="button" 
            onClick={() => handleNavClick('newsletter')} 
            className="nav-link"
          >
            Newsletter
          </button>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Quick Search Shortcut */}
          <button 
            type="button" 
            onClick={onSearchClick} 
            className="nav-action-btn search-trigger" 
            title="Search articles"
            aria-label="Search articles"
          >
            <Search size={18} />
            <span className="search-hint">Search...</span>
            <kbd className="search-kbd">⌘K</kbd>
          </button>

          {/* Saved Bookmarks Counter */}
          <button
            type="button"
            onClick={onOpenSaved}
            className={`nav-action-btn bookmark-trigger ${savedCount > 0 ? 'has-saved' : ''}`}
            title="View saved articles"
            aria-label={`View ${savedCount} saved articles`}
          >
            <Bookmark size={18} />
            {savedCount > 0 && <span className="saved-badge">{savedCount}</span>}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button 
            type="button" 
            onClick={onToggleTheme} 
            className="nav-action-btn theme-toggle" 
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={19} className="sun-icon" /> : <Moon size={19} className="moon-icon" />}
          </button>

          {/* CTA Button */}
          <button 
            type="button" 
            onClick={() => handleNavClick('newsletter')} 
            className="nav-cta-btn"
          >
            <Send size={15} />
            <span>Subscribe</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="logo-text-group">
                <span className="logo-name">Varshini<span className="accent-dot">.</span>Blog</span>
                <span className="logo-badge">EDITORIAL</span>
              </div>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)} 
                className="close-drawer-btn"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-links">
              <button 
                type="button" 
                onClick={() => handleNavClick('top')} 
                className="mobile-nav-item"
              >
                Home
              </button>
              <button 
                type="button" 
                onClick={() => handleNavClick('featured')} 
                className="mobile-nav-item"
              >
                Featured Story
              </button>
              <button 
                type="button" 
                onClick={() => handleNavClick('articles')} 
                className="mobile-nav-item"
              >
                All Articles
              </button>
              <button 
                type="button" 
                onClick={() => handleNavClick('about')} 
                className="mobile-nav-item"
              >
                About Varshini
              </button>
              <button 
                type="button" 
                onClick={() => handleNavClick('newsletter')} 
                className="mobile-nav-item"
              >
                Newsletter
              </button>
            </nav>

            <div className="mobile-drawer-footer">
              <div className="mobile-footer-row">
                <span className="theme-label">Theme Mode:</span>
                <button 
                  type="button" 
                  onClick={onToggleTheme} 
                  className="mobile-theme-btn"
                >
                  {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              <button 
                type="button" 
                onClick={() => handleNavClick('newsletter')} 
                className="mobile-cta-full"
              >
                <Send size={16} />
                <span>Join 15,000+ Subscribers</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
