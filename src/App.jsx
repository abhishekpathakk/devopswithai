import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Moon, Sun, Search, Menu, X } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import IndustrialTrainingPage from './pages/IndustrialTrainingPage';
import About from './pages/About';
import SearchModal from './components/SearchModal';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark'); // Default to dark
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Check if we are on the home page for anchor links
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      <CustomCursor />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
            <BrainCircuit size={28} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <span>Abhishek Pathak</span>
              <span style={{ fontSize: '0.7rem', fontWeight: '500', color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>DevOps & AI</span>
            </span>
          </Link>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {isHome ? (
              <>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/industrial-training" className="nav-link" style={{ color: 'var(--color-accent)' }} onClick={() => setIsMenuOpen(false)}>Industrial Training</Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link to="/industrial-training" className="nav-link" style={{ color: 'var(--color-accent)' }} onClick={() => setIsMenuOpen(false)}>Industrial Training</Link>
              </>
            )}
            
            <button onClick={() => setIsSearchOpen(true)} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', border: 'none' }} aria-label="Search">
              <Search size={20} />
            </button>
            <a href={isHome ? "#contact" : "/#contact"} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }} onClick={() => setIsMenuOpen(false)}>Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Main Content Area handled by React Router */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/:serviceId" element={<ServicePage />} />
          <Route path="/industrial-training" element={<IndustrialTrainingPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">Abhishek Pathak<br/><span style={{fontSize: '1rem', color: 'var(--color-text-secondary)'}}>DevOps & AI</span></div>
              <p style={{ color: '#a0a0a0', fontSize: '0.95rem' }}>
                Elite consultancy at the intersection of Artificial Intelligence and robust DevOps practices.
              </p>
            </div>
            <div>
              <div className="footer-title">Expertise</div>
              <div className="footer-links">
                <Link to="/services/ai" className="footer-link">AI Strategy</Link>
                <Link to="/services/mlops" className="footer-link">MLOps</Link>
                <Link to="/services/dataops" className="footer-link">DataOps</Link>
                <Link to="/services/db-migration" className="footer-link">DB Migration</Link>
                <Link to="/services/cloud-migration" className="footer-link">Cloud Migration</Link>
              </div>
            </div>
            <div>
              <div className="footer-title">Company</div>
              <div className="footer-links">
                <Link to="/about" className="footer-link">About Us</Link>
                <a href="#" className="footer-link">Case Studies</a>
                <a href="#" className="footer-link">Careers</a>
                <Link to="/" className="footer-link">Contact</Link>
              </div>
            </div>
            <div>
              <div className="footer-title">Legal</div>
              <div className="footer-links">
                <a href="#" className="footer-link">Privacy Policy</a>
                <a href="#" className="footer-link">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} Abhishek Pathak. All rights reserved.</div>
            <div>Remote • Global</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
