import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Heart, 
  Bookmark, 
  Share2, 
  Quote, 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Eye, 
  Sparkles,
  Type
} from 'lucide-react';

export default function BlogDetailModal({
  blog,
  onClose,
  onToggleLike,
  onToggleBookmark,
  isLiked,
  isBookmarked,
  onShare,
  allBlogs,
  onSelectPost,
  onAddComment
}) {
  const [fontSize, setFontSize] = useState('medium'); // small, medium, large
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState(blog ? blog.comments || [] : []);

  // Sync comments if blog changes
  useEffect(() => {
    if (blog) {
      setCommentsList(blog.comments || []);
    }
  }, [blog]);

  // Lock background body scroll when open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!blog) return null;

  const handleModalScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll > 0) {
      setScrollProgress((scrollTop / totalScroll) * 100);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: commentName.trim() || 'Thoughtful Reader',
      avatar: `https://images.unsplash.com/photo-${1535713875000 + Math.floor(Math.random() * 500)}?auto=format&fit=crop&w=150&q=80`,
      date: 'Just now',
      text: commentText.trim()
    };

    const updated = [newComment, ...commentsList];
    setCommentsList(updated);
    if (onAddComment) {
      onAddComment(blog.id, newComment);
    }
    setCommentName('');
    setCommentText('');
  };

  // Find related articles (same category or others, excluding current)
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== blog.id)
    .sort((a, b) => (a.category === blog.category ? -1 : 1))
    .slice(0, 2);

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'reading-size-small';
    if (fontSize === 'large') return 'reading-size-large';
    return 'reading-size-medium';
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-article-title"
    >
      {/* Reading Progress Indicator */}
      <div 
        className="modal-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        onScroll={handleModalScroll}
      >
        {/* Sticky Top Header */}
        <div className="modal-sticky-bar">
          <button 
            type="button" 
            onClick={onClose} 
            className="modal-back-btn"
            title="Return to articles"
          >
            <ArrowLeft size={16} />
            <span>Back to Articles</span>
          </button>

          <div className="modal-header-actions">
            {/* Font Size Adjuster */}
            <div className="font-size-group" title="Adjust reading font size">
              <Type size={14} className="font-icon" />
              <button 
                type="button" 
                onClick={() => setFontSize('small')}
                className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
              >
                A-
              </button>
              <button 
                type="button" 
                onClick={() => setFontSize('medium')}
                className={`font-btn ${fontSize === 'medium' ? 'active' : ''}`}
              >
                A
              </button>
              <button 
                type="button" 
                onClick={() => setFontSize('large')}
                className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
              >
                A+
              </button>
            </div>

            {/* Like */}
            <button 
              type="button" 
              onClick={() => onToggleLike(blog.id)} 
              className={`modal-action-btn ${isLiked ? 'liked' : ''}`}
              title="Like article"
              aria-label="Like article"
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              <span>{blog.likes + (isLiked ? 1 : 0)}</span>
            </button>

            {/* Bookmark */}
            <button 
              type="button" 
              onClick={() => onToggleBookmark(blog.id)} 
              className={`modal-action-btn ${isBookmarked ? 'bookmarked' : ''}`}
              title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
              aria-label="Bookmark article"
            >
              <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Share */}
            <button 
              type="button" 
              onClick={() => onShare(blog)} 
              className="modal-action-btn"
              title="Share article"
              aria-label="Share article"
            >
              <Share2 size={16} />
            </button>

            {/* Close */}
            <button 
              type="button" 
              onClick={onClose} 
              className="modal-close-btn"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Content */}
        <article className={`modal-article-body ${getFontSizeClass()}`}>
          {/* Article Category & Meta Header */}
          <div className="modal-meta-top">
            <span className="category-pill-large">{blog.category}</span>
            <div className="meta-items-row">
              <span className="meta-inline-item">
                <Calendar size={14} />
                <span>Published on {blog.date}</span>
              </span>
              <span className="meta-separator">•</span>
              <span className="meta-inline-item">
                <Clock size={14} />
                <span>{blog.readTime}</span>
              </span>
              <span className="meta-separator">•</span>
              <span className="meta-inline-item">
                <Eye size={14} />
                <span>{blog.views || '2.4k'} reads</span>
              </span>
            </div>
          </div>

          {/* Article Title */}
          <h1 id="modal-article-title" className="modal-title">
            {blog.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="modal-lead-excerpt">
            {blog.excerpt}
          </p>

          {/* Author Box */}
          <div className="modal-author-strip">
            <img 
              src={blog.author.avatar} 
              alt={blog.author.name} 
              className="modal-author-avatar" 
            />
            <div className="modal-author-info">
              <span className="modal-author-name">{blog.author.name}</span>
              <span className="modal-author-role">{blog.author.role}</span>
            </div>
          </div>

          {/* Full Banner Image */}
          <div className="modal-hero-image-wrap">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="modal-hero-image" 
            />
          </div>

          {/* Render Full Content */}
          <div className="article-rendered-text">
            {blog.content && blog.content.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h3 key={idx} className="article-subheading">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'quote') {
                return (
                  <blockquote key={idx} className="article-blockquote">
                    <Quote size={28} className="quote-icon" />
                    <p className="quote-text">{block.text}</p>
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="article-paragraph">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="modal-tags-section">
            <span className="tags-label">Categorized in:</span>
            <div className="tags-container">
              {blog.tags.map((tag) => (
                <span key={tag} className="article-tag-chip">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <section className="modal-comments-section">
            <div className="comments-header">
              <MessageSquare size={20} className="comments-header-icon" />
              <h3>Community Discussion ({commentsList.length})</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="comment-form-row">
                <input 
                  type="text" 
                  value={commentName} 
                  onChange={(e) => setCommentName(e.target.value)} 
                  placeholder="Your Name (e.g., Alex Johnson)"
                  className="comment-name-input"
                />
              </div>
              <div className="comment-form-row">
                <textarea 
                  rows={3}
                  value={commentText} 
                  onChange={(e) => setCommentText(e.target.value)} 
                  placeholder="Share your thoughts or question on this topic..."
                  className="comment-textarea"
                  required
                />
              </div>
              <button type="submit" className="comment-submit-btn">
                <Send size={15} />
                <span>Post Comment</span>
              </button>
            </form>

            {/* Existing Comments List */}
            <div className="comments-list">
              {commentsList.length > 0 ? (
                commentsList.map((c) => (
                  <div key={c.id} className="comment-card">
                    <img src={c.avatar} alt={c.author} className="comment-avatar" />
                    <div className="comment-body">
                      <div className="comment-header-info">
                        <span className="comment-author-name">{c.author}</span>
                        <span className="comment-time">{c.date}</span>
                      </div>
                      <p className="comment-content">{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-comments-msg">No comments yet. Be the first to share your perspective!</p>
              )}
            </div>
          </section>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <section className="related-articles-section">
              <h3 className="related-heading">More from Varshini Blog</h3>
              <div className="related-grid">
                {relatedBlogs.map((item) => (
                  <div 
                    key={item.id} 
                    className="related-card"
                    onClick={() => {
                      onSelectPost(item);
                      // Scroll to top of modal
                      const container = document.querySelector('.modal-container');
                      if (container) container.scrollTop = 0;
                    }}
                  >
                    <img src={item.image} alt={item.title} className="related-thumb" />
                    <div className="related-info">
                      <span className="related-category">{item.category}</span>
                      <h4 className="related-title">{item.title}</h4>
                      <div className="related-meta">
                        <span>{item.readTime}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
