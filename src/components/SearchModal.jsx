import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setHasSearched(false);
      return;
    }
    
    const fetchResults = async () => {
      setLoading(true);
      setHasSearched(true);
      try {
        const res = await fetch(`/api/search?q=${query}`);
        if(res.ok) {
           const data = await res.json();
           setResults(data.results || []);
        } else {
           setResults([]);
        }
      } catch (error) {
        console.error("Search failed", error);
        setResults([]);
      }
      setLoading(false);
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleResultClick = (id) => {
    onClose();
    navigate(`/services/${id}`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="search-modal-overlay" onClick={onClose}>
        <motion.div 
          className="search-modal-content"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={20} />
            <input 
              type="text" 
              placeholder="Search courses, training, catalogs..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button className="close-btn" onClick={onClose}><X size={20} /></button>
          </div>
          
          <div className="search-results">
            {loading ? (
              <div className="search-loading">Searching...</div>
            ) : results.length > 0 ? (
              results.map(item => (
                <div key={item.id} className="search-result-item" onClick={() => handleResultClick(item.id)}>
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
