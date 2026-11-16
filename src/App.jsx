import React, { useState, useEffect, useRef } from 'react';
import initialBlogsData from './data/blogs.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedPost from './components/FeaturedPost';
import CategoryFilter from './components/CategoryFilter';
import BlogGrid from './components/BlogGrid';
import BlogDetailModal from './components/BlogDetailModal';
import SavedArticlesModal from './components/SavedArticlesModal';
import Newsletter from './components/Newsletter';
import AuthorBio from './components/AuthorBio';
import Footer from './components/Footer';
import Toast from './components/Toast';
import './App.css';

export default function App() {
  const [blogs, setBlogs] = useState(initialBlogsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  
  // Local storage / state for theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('varshini_blog_theme') || 'light';
  });

  // State for user interactions
  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('varshini_blog_likes');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookmarkedPosts, setBookmarkedPosts] = useState(() => {
    const saved = localStorage.getItem('varshini_blog_bookmarks');
    return saved ? JSON.parse(saved) : ['1', '2']; // pre-save 2 favorites as nice initial UX
  });

  // Toast feedback state
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('varshini_blog_theme', theme);
  }, [theme]);

  // Persist likes & bookmarks
  useEffect(() => {
    localStorage.setItem('varshini_blog_likes', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('varshini_blog_bookmarks', JSON.stringify(bookmarkedPosts));
  }, [bookmarkedPosts]);

  // Keyboard shortcut Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    showToast(`Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  const handleSearchClick = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  };

  const handleToggleLike = (id) => {
    setLikedPosts(prev => {
      const isAlreadyLiked = prev.includes(id);
      if (isAlreadyLiked) {
        showToast('Like removed', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Liked! Thank you for the appreciation ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const handleToggleBookmark = (id) => {
    setBookmarkedPosts(prev => {
      const isAlreadyBookmarked = prev.includes(id);
      if (isAlreadyBookmarked) {
        showToast('Removed from reading list', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Added to your reading list 🔖', 'success');
        return [...prev, id];
      }
    });
  };

  const handleShare = async (post) => {
    const shareUrl = window.location.href.split('#')[0] + `#article-${post.slug}`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast(`Copied article link: "${post.title.substring(0, 30)}..."`, 'success');
        return;
      } catch (err) {
        // fallback
      }
    }
    showToast('Link ready to share!', 'info');
  };

  const handleAddComment = (blogId, comment) => {
    setBlogs(prev => prev.map(b => {
      if (b.id === blogId) {
        return {
          ...b,
          comments: [comment, ...(b.comments || [])]
        };
      }
      return b;
    }));
    showToast('Your comment was published successfully!', 'success');
  };

  const handleNewsletterSubscribe = (email) => {
    showToast(`Welcome! Subscription confirmed for ${email}`, 'success');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    showToast('Filters cleared', 'info');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Derive unique categories and category article counts
  const categories = Array.from(new Set(blogs.map(b => b.category)));
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = blogs.filter(b => b.category === cat).length;
    return acc;
  }, {});

  // Primary spotlight article
  const featuredPost = blogs.find(b => b.featured) || blogs[0];

  // Combined search and category filtering
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      blog.title.toLowerCase().includes(q) ||
      blog.excerpt.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q) ||
      blog.tags.some(t => t.toLowerCase().includes(q))
    );
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === 'popular') {
      const likesA = a.likes + (likedPosts.includes(a.id) ? 1 : 0);
      const likesB = b.likes + (likedPosts.includes(b.id) ? 1 : 0);
      return likesB - likesA;
    }
    if (sortBy === 'quickest') {
      const timeA = parseInt(a.readTime, 10) || 5;
      const timeB = parseInt(b.readTime, 10) || 5;
      return timeA - timeB;
    }
    // Default 'latest' (descending by ID)
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  });

  const savedArticlesList = blogs.filter(b => bookmarkedPosts.includes(b.id));

  return (
    <div className="app-root">
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onSearchClick={handleSearchClick}
        savedCount={bookmarkedPosts.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        activeFilter={selectedCategory}
      />

      <main className="main-content">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('articles');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onReadSpotlight={() => setSelectedPost(featuredPost)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchInputRef={searchInputRef}
        />

        {/* Featured Blog Story Section */}
        <FeaturedPost
          post={featuredPost}
          onSelectPost={setSelectedPost}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          isLiked={likedPosts.includes(featuredPost.id)}
          isBookmarked={bookmarkedPosts.includes(featuredPost.id)}
          onShare={handleShare}
        />

        {/* Category Filter Pills & Search Status */}
        <div className="content-container">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            totalCount={blogs.length}
            activeSearchQuery={searchQuery}
            onClearFilters={handleClearFilters}
          />

          {/* Responsive Blog Articles Grid */}
          <BlogGrid
            blogs={sortedBlogs}
            totalBlogsCount={blogs.length}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearFilters={handleClearFilters}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onSelectPost={setSelectedPost}
            onToggleLike={handleToggleLike}
            onToggleBookmark={handleToggleBookmark}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
            onShare={handleShare}
          />
        </div>

        {/* Author Bio Section */}
        <AuthorBio />

        {/* Newsletter Section */}
        <Newsletter onSubscribe={handleNewsletterSubscribe} />
      </main>

      {/* Footer */}
      <Footer 
        onCategoryClick={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
        }}
        onScrollToTop={handleScrollToTop}
      />

      {/* Full Article Reader Modal (Read More Functionality) */}
      {selectedPost && (
        <BlogDetailModal
          blog={selectedPost}
          onClose={() => setSelectedPost(null)}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          isLiked={likedPosts.includes(selectedPost.id)}
          isBookmarked={bookmarkedPosts.includes(selectedPost.id)}
          onShare={handleShare}
          allBlogs={blogs}
          onSelectPost={setSelectedPost}
          onAddComment={handleAddComment}
        />
      )}

      {/* Saved Bookmarks Modal */}
      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={setSelectedPost}
        onRemoveBookmark={handleToggleBookmark}
      />
    </div>
  );
}
