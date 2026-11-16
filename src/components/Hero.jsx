import React from 'react';
import { ArrowDown, Sparkles, BookOpen, TrendingUp, Users, Award, Search } from 'lucide-react';

export default function Hero({ 
  onExploreClick, 
  onReadSpotlight, 
  searchQuery, 
  onSearchChange,
  searchInputRef 
}) {
  return (
    <section id="top" className="hero-section">
      <div className="hero-glow-blob top-blob" aria-hidden="true" />
      <div className="hero-glow-blob bottom-blob" aria-hidden="true" />

      <div className="hero-content-wrapper">
        {/* Badge */}
        <div className="hero-badge">
          <Sparkles size={14} className="badge-sparkle-icon" />
          <span>Curated Tech &amp; Design Publication • Issue #42</span>
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          Where <span className="gradient-text">Engineering</span>,{' '}
          <span className="italic-serif">Design</span> &amp; Modern Ideas Converge.
        </h1>

        {/* Subtitle */}
        <p className="hero-description">
          An editorial space exploring reactive frontend architecture, generative user interfaces, 
          fluid design systems, and rapid software career growth. Written with precision by Varshini M.
        </p>

        {/* Hero Interactive Search Bar */}
        <div className="hero-search-box">
          <Search size={20} className="hero-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, technology, architecture, or topic..."
            className="hero-search-input"
            aria-label="Search articles"
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => onSearchChange('')} 
              className="hero-search-clear"
              title="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action CTAs */}
        <div className="hero-cta-group">
          <button 
            type="button" 
            onClick={onExploreClick} 
            className="hero-primary-btn"
          >
            <span>Explore All Articles</span>
            <ArrowDown size={18} />
          </button>
          <button 
            type="button" 
            onClick={onReadSpotlight} 
            className="hero-secondary-btn"
          >
            <BookOpen size={18} />
            <span>Read Spotlight Story</span>
          </button>
        </div>

        {/* Editorial Stats Bar */}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap">
              <BookOpen size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-number">9+</span>
              <span className="stat-label">In-depth Articles</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <TrendingUp size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-number">5</span>
              <span className="stat-label">Core Domains</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <Users size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-number">15,000+</span>
              <span className="stat-label">Monthly Readers</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap">
              <Award size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-number">4.9 / 5</span>
              <span className="stat-label">Reader Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
