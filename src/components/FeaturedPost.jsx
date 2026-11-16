import React from 'react';
import { Clock, Calendar, Heart, Bookmark, Share2, ArrowRight, Sparkles } from 'lucide-react';

export default function FeaturedPost({ 
  post, 
  onSelectPost, 
  onToggleLike, 
  onToggleBookmark, 
  isLiked, 
  isBookmarked, 
  onShare 
}) {
  if (!post) return null;

  return (
    <section id="featured" className="featured-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Editor's Spotlight</span>
          </div>
          <h2 className="section-heading">Featured Story of the Month</h2>
        </div>
        <p className="section-subtext">Hand-picked deep dive into contemporary software architecture and digital design.</p>
      </div>

      <div className="featured-card">
        {/* Featured Image Container */}
        <div 
          className="featured-image-container"
          onClick={() => onSelectPost(post)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectPost(post)}
          aria-label={`Read ${post.title}`}
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="featured-image"
            loading="lazy" 
          />
          <div className="featured-overlay" />
          <div className="featured-floating-tag">
            <span>Must-Read</span>
          </div>
        </div>

        {/* Featured Content Container */}
        <div className="featured-content">
          <div className="featured-meta-row">
            <span className="category-pill featured-cat">{post.category}</span>
            <div className="meta-item">
              <Clock size={15} />
              <span>{post.readTime}</span>
            </div>
            <div className="meta-item">
              <Calendar size={15} />
              <span>{post.date}</span>
            </div>
          </div>

          <h3 
            className="featured-title"
            onClick={() => onSelectPost(post)}
          >
            {post.title}
          </h3>

          <p className="featured-excerpt">
            {post.excerpt}
          </p>

          <div className="featured-tags-list">
            {post.tags.map(tag => (
              <span key={tag} className="tag-chip">#{tag}</span>
            ))}
          </div>

          {/* Author and Action Controls */}
          <div className="featured-footer">
            <div className="author-box">
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="author-avatar" 
              />
              <div className="author-meta">
                <span className="author-name">{post.author.name}</span>
                <span className="author-role">{post.author.role}</span>
              </div>
            </div>

            <div className="featured-actions">
              <button 
                type="button" 
                onClick={() => onToggleLike(post.id)} 
                className={`action-btn-circle ${isLiked ? 'liked' : ''}`}
                title="Like article"
                aria-label="Like article"
              >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                <span className="action-counter">{post.likes + (isLiked ? 1 : 0)}</span>
              </button>

              <button 
                type="button" 
                onClick={() => onToggleBookmark(post.id)} 
                className={`action-btn-circle ${isBookmarked ? 'bookmarked' : ''}`}
                title={isBookmarked ? "Remove from bookmarks" : "Save article"}
                aria-label="Bookmark article"
              >
                <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
              </button>

              <button 
                type="button" 
                onClick={() => onShare(post)} 
                className="action-btn-circle"
                title="Share article link"
                aria-label="Share article"
              >
                <Share2 size={18} />
              </button>

              <button 
                type="button" 
                onClick={() => onSelectPost(post)} 
                className="featured-read-btn"
              >
                <span>Read Full Story</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
