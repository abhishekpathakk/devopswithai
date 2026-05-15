import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Award, ShieldCheck, Zap, User } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Dynamic Title for SEO
    document.title = "Abhishek Pathak | Founder of DevOpsWithAI";
    
    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Meet Abhishek Pathak, the visionary behind DevOpsWithAI. Expert in GCP, Kubernetes, and AI-driven infrastructure optimization.");
    }
  }, []);

  // Structured Data (JSON-LD) for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abhishek Pathak",
    "jobTitle": "DevOps & AI Architect",
    "url": "https://devopswithai.in/about",
    "sameAs": [
      "https://www.linkedin.com/in/abhishekpathakk9/"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "DevOpsWithAI"
    }
  };

  return (
    <div className="about-page" style={{ paddingTop: 'min(100px, 15vh)' }}>
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <section className="section">
        <div className="container">
          <div className="about-grid">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div className="image-frame" style={{ 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                background: 'var(--color-bg-secondary)'
              }}>
                {/* Use the provided image path */}
                <img 
                  src="/assets/abhishek.png" 
                  alt="Abhishek Pathak - DevOps & AI Architect" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                background: 'var(--color-accent)',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 10px 20px var(--color-accent-glow)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#000' }}>8+</div>
                <div style={{ fontSize: '0.7rem', color: '#000', fontWeight: '600', textTransform: 'uppercase' }}>Years Experience</div>
              </div>
            </motion.div>

            {/* Content Section */}
            <div className="about-content">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="hero-badge"
              >
                The Mind Behind DevOpsWithAI
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-display"
                style={{ marginBottom: '1.5rem' }}
              >
                Abhishek Pathak
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: 'min(1.2rem, 4.5vw)', color: 'var(--color-text-secondary)', marginBottom: '2rem' }}
              >
                DevOps Architect, Cloud Infrastructure Specialist, and AI Integration Expert. 
                With a mission to modernize how enterprises build, scale, and secure their digital core.
              </motion.p>

              <div className="expertise-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Google Cloud Platform', 'Kubernetes (GKE)', 'Cloud Spanner', 'BigQuery', 'MLOps', 'Industrial Training'].map((skill, i) => (
                  <span key={i} style={{ 
                    padding: '0.4rem 1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '100px',
                    fontSize: '0.85rem'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className="social-links" style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="https://www.linkedin.com/in/abhishekpathakk9/" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ExternalLink size={20} /> LinkedIn
                </a>
                <a href="mailto:contact@devopswithai.in" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={20} /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About DevOpsWithAI Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="section-title">
            <h2>About DevOpsWithAI</h2>
            <p>More than just a consultancy—it's a paradigm shift in engineering.</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <Zap className="service-icon" />
              <h3>The Vision</h3>
              <p>We believe that DevOps is the backbone of AI. Our mission is to automate the complex, so you can innovate the extraordinary.</p>
            </div>
            <div className="service-card">
              <ShieldCheck className="service-icon" />
              <h3>The Standard</h3>
              <p>Enterprise-grade security, global scalability, and 99.99% reliability aren't goals—they are our starting point.</p>
            </div>
            <div className="service-card">
              <Award className="service-icon" />
              <h3>The Impact</h3>
              <p>From migrating 2M+ rows to Spanner to architecting multi-region GKE clusters, we deliver results that scale with your ambitions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
