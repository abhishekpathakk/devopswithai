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
            {/* Image Section - Beautifully Blended with Dark/Cyan UI */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              {/* Ambient Neon Cyan Backlight Glow */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                width: '90%',
                height: '90%',
                background: 'radial-gradient(circle, rgba(0, 240, 255, 0.28) 0%, rgba(138, 43, 226, 0.18) 45%, transparent 75%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none',
              }} />

              {/* Status Pill */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(5, 8, 17, 0.82)',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                backdropFilter: 'blur(12px)',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '0.78rem',
                fontWeight: '600',
                color: 'var(--color-accent)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                letterSpacing: '0.04em'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  boxShadow: '0 0 10px var(--color-accent)',
                  display: 'inline-block',
                }} />
                Founder & Principal Architect
              </div>

              {/* Glassmorphic Gradient Outer Frame */}
              <div className="image-frame" style={{ 
                position: 'relative',
                zIndex: 1,
                borderRadius: '28px', 
                overflow: 'hidden', 
                padding: '4px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.6) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(0, 240, 255, 0.3) 100%)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 240, 255, 0.16)'
              }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  background: '#070913'
                }}>
                  <img 
                    src="/assets/abhishek.png" 
                    alt="Abhishek Pathak - Founder, DevOps & AI Architect" 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block',
                      objectFit: 'cover',
                      filter: 'contrast(1.05) brightness(1.02)'
                    }}
                  />
                  {/* Subtle Bottom Gradient Blend Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '35%',
                    background: 'linear-gradient(to top, rgba(7, 9, 19, 0.88) 0%, rgba(7, 9, 19, 0.3) 55%, transparent 100%)',
                    pointerEvents: 'none'
                  }} />
                  {/* Subtle Top-Right Ambient Cyan Glow */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '45%',
                    height: '45%',
                    background: 'radial-gradient(circle at top right, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>

              {/* Floating Experience Badge */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  right: '-16px',
                  zIndex: 3,
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.98), rgba(0, 180, 216, 0.9))',
                  padding: '1.25rem 1.75rem',
                  borderRadius: '20px',
                  boxShadow: '0 15px 35px rgba(0, 240, 255, 0.45), 0 5px 15px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#050811', lineHeight: 1 }}>8+</div>
                <div style={{ fontSize: '0.72rem', color: '#050811', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>Years Experience</div>
              </motion.div>
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
                Trusted by engineering leaders to modernize legacy enterprise platforms for global giants including <strong>Costco</strong>, <strong>FedEx</strong>, and <strong>Hyundai</strong>, utilizing modern IaC like AWS CDK, multi-cloud architectures, and production MLOps.
              </motion.p>

              <div className="expertise-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                {['Enterprise Modernization', 'AWS CDK', 'AWS & Cloud Architecture', 'Kubernetes (GKE/EKS)', 'Google Cloud Platform', 'Cloud Spanner', 'BigQuery', 'MLOps', 'Industrial Training'].map((skill, i) => (
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
              <p>From modernizing mission-critical legacy platforms for Costco, FedEx, and Hyundai to architecting automated AWS CDK pipelines and multi-region clusters, we deliver results that scale globally.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
