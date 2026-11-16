import React, { useEffect } from 'react';
import { X, Bookmark, ArrowRight, Trash2, BookOpen } from 'lucide-react';

export default function SavedArticlesModal({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="saved-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="saved-modal-header">
          <div className="saved-title-group">
            <Bookmark size={20} className="saved-icon" />
            <h3>Your Saved Reading List ({savedArticles.length})</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Close saved articles dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="saved-modal-body">
          {savedArticles.length > 0 ? (
            <div className="saved-articles-list">
              {savedArticles.map((article) => (
                <div key={article.id} className="saved-item-card">
                  <img src={article.image} alt={article.title} className="saved-item-thumb" />
                  <div className="saved-item-content">
                    <span className="saved-category-pill">{article.category}</span>
                    <h4 
                      className="saved-item-title"
                      onClick={() => {
                        onClose();
                        onSelectArticle(article);
                      }}
                    >
                      {article.title}
                    </h4>
                    <span className="saved-item-meta">{article.readTime} • {article.date}</span>
                  </div>
                  <div className="saved-item-actions">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectArticle(article);
                      }}
                      className="saved-read-btn"
                      title="Read article"
                    >
                      <BookOpen size={16} />
                      <span>Read</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveBookmark(article.id)}
                      className="saved-delete-btn"
                      title="Remove bookmark"
                      aria-label="Remove from bookmarks"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-saved-box">
              <Bookmark size={40} className="empty-saved-icon" />
              <h4>Your reading list is empty</h4>
              <p>Click the bookmark icon on any card to save articles for offline or later reading.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
