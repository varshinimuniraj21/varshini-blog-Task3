import React from 'react';
import { Clock, Calendar, Heart, Bookmark, Share2, ArrowRight } from 'lucide-react';

export default function BlogCard({ 
  blog, 
  onSelectPost, 
  onToggleLike, 
  onToggleBookmark, 
  isLiked, 
  isBookmarked, 
  onShare 
}) {
  const getCategoryClass = (cat) => {
    switch (cat) {
      case 'AI & Innovation': return 'cat-ai';
      case 'UI/UX Design': return 'cat-design';
      case 'Technology': return 'cat-tech';
      case 'Web Development': return 'cat-web';
      case 'Career & Growth': return 'cat-career';
      default: return 'cat-default';
    }
  };

  return (
    <article className="blog-card" id={`card-${blog.id}`}>
      {/* Thumbnail */}
      <div 
        className="card-image-wrap"
        onClick={() => onSelectPost(blog)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectPost(blog)}
        aria-label={`Read article: ${blog.title}`}
      >
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="card-image" 
          loading="lazy" 
        />
        <div className="card-image-overlay" />
        <span className={`card-category-badge ${getCategoryClass(blog.category)}`}>
          {blog.category}
        </span>
        {blog.trending && (
          <span className="card-trending-badge">
            🔥 Trending
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Meta Info */}
        <div className="card-meta">
          <div className="meta-point">
            <Calendar size={13} />
            <span>{blog.date}</span>
          </div>
          <span className="meta-separator">•</span>
          <div className="meta-point">
            <Clock size={13} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          className="card-title" 
          onClick={() => onSelectPost(blog)}
          title={blog.title}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="card-excerpt">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="card-tags">
          {blog.tags.slice(0, 3).map(tag => (
            <span key={tag} className="card-tag">#{tag}</span>
          ))}
        </div>

        {/* Author & Actions Footer */}
        <div className="card-footer">
          <div className="card-author">
            <img 
              src={blog.author.avatar} 
              alt={blog.author.name} 
              className="card-author-avatar" 
            />
            <div className="card-author-info">
              <span className="card-author-name">{blog.author.name}</span>
              <span className="card-author-role">{blog.author.role.split('&')[0]}</span>
            </div>
          </div>

          <div className="card-actions">
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onToggleLike(blog.id); }} 
              className={`card-icon-btn ${isLiked ? 'liked' : ''}`}
              title="Like this story"
              aria-label="Like story"
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span className="like-count">{blog.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onToggleBookmark(blog.id); }} 
              className={`card-icon-btn ${isBookmarked ? 'bookmarked' : ''}`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark this story"}
              aria-label="Bookmark story"
            >
              <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onShare(blog); }} 
              className="card-icon-btn"
              title="Share story"
              aria-label="Share story"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Read More Trigger */}
        <button 
          type="button" 
          onClick={() => onSelectPost(blog)} 
          className="card-readmore-btn"
        >
          <span>Read Full Article</span>
          <ArrowRight size={15} className="readmore-arrow" />
        </button>
      </div>
    </article>
  );
}
