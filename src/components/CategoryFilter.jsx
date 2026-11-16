import React from 'react';
import { Filter, Layers, X } from 'lucide-react';

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  totalCount,
  activeSearchQuery,
  onClearFilters
}) {
  const hasActiveFilters = selectedCategory !== 'All' || activeSearchQuery.trim() !== '';

  return (
    <div className="filter-wrapper" id="categories">
      <div className="filter-top-bar">
        <div className="filter-title-group">
          <Layers size={18} className="filter-icon" />
          <span className="filter-label">Filter by Topic:</span>
        </div>

        {hasActiveFilters && (
          <button 
            type="button" 
            onClick={onClearFilters} 
            className="clear-filters-btn"
            title="Reset filters and search"
          >
            <X size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      <div className="category-pills-row" role="tablist" aria-label="Blog categories">
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === 'All'}
          onClick={() => onSelectCategory('All')}
          className={`category-pill-btn ${selectedCategory === 'All' ? 'active' : ''}`}
        >
          <span>All Stories</span>
          <span className="pill-count">{totalCount}</span>
        </button>

        {categories.map((cat) => {
          const count = categoryCounts[cat] || 0;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => onSelectCategory(cat)}
              className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              <span>{cat}</span>
              <span className="pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
