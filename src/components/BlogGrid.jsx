import React from 'react';
import BlogCard from './BlogCard';
import { SearchX, ArrowUpDown } from 'lucide-react';

export default function BlogGrid({
  blogs,
  totalBlogsCount,
  searchQuery,
  selectedCategory,
  onClearFilters,
  sortBy,
  onSortChange,
  onSelectPost,
  onToggleLike,
  onToggleBookmark,
  likedPosts,
  bookmarkedPosts,
  onShare
}) {
  return (
    <section id="articles" className="articles-section">
      {/* Grid Controls Header */}
      <div className="grid-header-row">
        <div className="grid-count-box">
          <h2 className="grid-heading">Latest Editorial Articles</h2>
          <span className="grid-count-badge">
            {blogs.length === totalBlogsCount 
              ? `Showing all ${blogs.length} articles`
              : `Found ${blogs.length} of ${totalBlogsCount} articles`
            }
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="sort-box">
          <label htmlFor="blog-sort" className="sort-label">
            <ArrowUpDown size={14} />
            <span>Sort by:</span>
          </label>
          <select 
            id="blog-sort" 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
            aria-label="Sort articles"
          >
            <option value="latest">Latest First</option>
            <option value="popular">Most Popular (Likes)</option>
            <option value="quickest">Quickest Read</option>
          </select>
        </div>
      </div>

      {/* Blog Cards Grid or Empty State */}
      {blogs.length > 0 ? (
        <div className="blog-grid" role="feed" aria-label="Articles list">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onSelectPost={onSelectPost}
              onToggleLike={onToggleLike}
              onToggleBookmark={onToggleBookmark}
              isLiked={likedPosts.includes(blog.id)}
              isBookmarked={bookmarkedPosts.includes(blog.id)}
              onShare={onShare}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-wrapper">
            <SearchX size={44} className="empty-icon" />
          </div>
          <h3 className="empty-title">No articles found</h3>
          <p className="empty-desc">
            We couldn't find any articles matching "{searchQuery}" 
            {selectedCategory !== 'All' ? ` in the "${selectedCategory}" category` : ''}.
          </p>
          <button 
            type="button" 
            onClick={onClearFilters} 
            className="empty-reset-btn"
          >
            Reset Filters &amp; View All
          </button>
        </div>
      )}
    </section>
  );
}
