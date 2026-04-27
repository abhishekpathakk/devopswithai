import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BrainCircuit, 
  Network, 
  Cpu, 
  CloudCog, 
  BarChart, 
  ShieldCheck,
  Moon,
  Sun
} from 'lucide-react';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <BrainCircuit size={28} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
              <span>Abhishek Pathak</span>
              <span style={{ fontSize: '0.7rem', fontWeight: '500', color: 'var(--color-text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>DevOps & AI</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="#expertise" className="nav-link">Expertise</a>
            <a href="#process" className="nav-link">Process</a>
            <a href="#impact" className="nav-link">Impact</a>
            <button onClick={toggleTheme} className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="hero-badge">
              Leading the Digital Frontier
            </motion.div>
            <motion.h1 variants={fadeInUp}>
              Architecting Intelligence.<br />Engineering Scale.
            </motion.h1>
            <motion.p variants={fadeInUp}>
              We are a premier consultancy firm specializing in Artificial Intelligence and DevOps. We help forward-thinking enterprises build resilient infrastructure and deploy transformative AI models.
            </motion.p>
            <motion.div variants={fadeInUp} className="hero-buttons">
              <a href="#expertise" className="btn btn-primary">
                Explore Our Services <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </a>
              <a href="#contact" className="btn btn-outline">
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise / Services */}
      <section id="expertise" className="section">
        <div className="container">
          <motion.div 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2>Core Expertise</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Leveraging deep technical knowledge to deliver scalable, secure, and intelligent solutions for complex enterprise challenges.</p>
          </motion.div>

          <motion.div 
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="service-card">
              <Cpu className="service-icon" />
              <h3>AI Strategy & Implementation</h3>
              <p>From predictive analytics to Generative AI, we design bespoke intelligent systems that integrate seamlessly into your business workflows.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="service-card">
              <Network className="service-icon" />
              <h3>DevOps Transformation</h3>
              <p>Accelerate your delivery pipelines with robust CI/CD frameworks, infrastructure as code, and advanced automation techniques.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="service-card">
              <CloudCog className="service-icon" />
              <h3>End-to-End MLOps Ecosystems</h3>
              <p>Streamlining the lifecycle from research to production. We architect automated pipelines for model training, orchestration, and real-time monitoring to ensure your AI scales reliably.</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="service-card">
              <ShieldCheck className="service-icon" />
              <h3>Enterprise Cloud Security</h3>
              <p>Architect zero-trust security models and ensure continuous compliance across complex multi-cloud and hybrid environments.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section id="impact" className="section stats">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <div className="stat-number">Fortune 500</div>
              <div className="stat-label">Trusted Partners</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="stat-number">99.99%</div>
              <div className="stat-label">Uptime Delivered</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="stat-number">50M+</div>
              <div className="stat-label">Predictions Served Daily</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="stat-number">40%</div>
              <div className="stat-label">Faster Time-to-Market</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section">
        <div className="container">
          <motion.div 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Our Methodology</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>A rigorous, proven approach to solving the most difficult engineering and data challenges.</p>
          </motion.div>

          <div className="process-timeline">
            {[
              { title: "Discovery & Audit", desc: "We conduct a deep-dive analysis into your current architecture, identifying bottlenecks and opportunities for AI integration." },
              { title: "Strategic Architecture", desc: "Our principals design scalable, resilient blueprints aligned with your long-term business objectives." },
              { title: "Iterative Engineering", desc: "Agile implementation with continuous integration, ensuring transparent progress and immediate value delivery." },
              { title: "Operational Excellence", desc: "Handover with comprehensive MLOps/DevOps practices, monitoring systems, and team upskilling." }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="process-step"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <div className="step-number">{index + 1}</div>
                <div className="timeline-line"></div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="section cta-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Ready to Transform Your Infrastructure?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>Partner with our experts to build the intelligent, scalable systems that will define your competitive advantage.</p>
            <button className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}>
              Schedule an Executive Briefing
            </button>
          </motion.div>
        </div>
      </section>

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
                <a href="#" className="footer-link">AI Strategy</a>
                <a href="#" className="footer-link">DevOps</a>
                <a href="#" className="footer-link">MLOps</a>
                <a href="#" className="footer-link">Cloud Security</a>
              </div>
            </div>
            <div>
              <div className="footer-title">Company</div>
              <div className="footer-links">
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Case Studies</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Contact</a>
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
