import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { searchData } from '../data/searchData';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Initialize Fuse.js client-side fuzzy search
  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ['title', 'description', 'category', 'tags'],
    threshold: 0.35,
    ignoreLocation: true,
  }), []);

  const results = useMemo(() => {
    if (!isOpen) return [];
    if (!query.trim()) return searchData.slice(0, 4);
    return fuse.search(query).map((result) => result.item);
  }, [query, isOpen, fuse]);
  const hasSearched = Boolean(query.trim());

  const handleClose = useCallback(() => {
    setQuery('');
    onClose();
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const handleResultClick = (item) => {
    handleClose();
    if (item.path) {
      navigate(item.path);
    } else {
      navigate(`/services/${item.id}`);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter' && results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="search-modal-overlay" onClick={handleClose}>
        <motion.div
          className="search-modal-content"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={20} />
            <input
              type="text"
              placeholder="Search services, AWS CDK, training, modernization..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              autoFocus
            />
            <button className="close-btn" onClick={handleClose} aria-label="Close search">
              <X size={20} />
            </button>
          </div>

          <div className="search-results">
            {results.length > 0 ? (
              <>
                {!hasSearched && (
                  <div style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Featured Services & Topics
                  </div>
                )}
                {results.map((item) => (
                  <div key={item.id} className="search-result-item" onClick={() => handleResultClick(item)}>
                    <div className="search-result-icon">
                      <BookOpen size={18} />
                    </div>
                    <div className="search-result-details">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <span className="search-category">{item.category} • {item.level}</span>
                    </div>
                  </div>
                ))
                }
              </>
            ) : hasSearched && query !== '' ? (
              <div className="search-empty">No results found for "{query}"</div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
