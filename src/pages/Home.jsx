import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Network, CloudCog, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import NeuralBackground from '../components/NeuralBackground';
import TestimonialSlider from '../components/TestimonialSlider';
import PipelineAnimation from '../components/PipelineAnimation';
import LogoTicker from '../components/LogoTicker';

const Counter = ({ value, duration = 2 }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''));
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count}{value.replace(/[0-9]/g, '')}</>;
};

const Home = () => {
  const handleExploreClick = (e) => {
    e.preventDefault();
    document.getElementById('pipeline-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <NeuralBackground />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="hero-badge">
              Leading the Digital Frontier
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-huge">
              Architecting Intelligence.<br />Engineering Scale.
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ fontSize: 'min(1.25rem, 4.5vw)' }}>
              Engineering the next generation of hyper-scalable, AI-driven infrastructure to redefine digital possibilities.
            </motion.p>
            <motion.div variants={fadeInUp} className="hero-buttons">
              <button onClick={handleExploreClick} className="btn btn-primary">
                Explore Our Pipeline <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </button>
              <a href="#contact" className="btn btn-outline">
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div id="pipeline-section">
        <PipelineAnimation />
      </div>
      <LogoTicker />

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
            <motion.div variants={fadeInUp}>
              <Link to="/services/ai" className="service-card" style={{ display: 'block', height: '100%' }}>
                <Cpu className="service-icon" />
                <h3>AI Strategy & Implementation</h3>
                <p>From predictive analytics to Generative AI, we design bespoke intelligent systems that integrate seamlessly into your business workflows.</p>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link to="/services/mlops" className="service-card" style={{ display: 'block', height: '100%' }}>
                <CloudCog className="service-icon" />
                <h3>End-to-End MLOps Ecosystems</h3>
                <p>Streamlining the lifecycle from research to production. We architect automated pipelines for model training, orchestration, and monitoring.</p>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link to="/services/dataops" className="service-card" style={{ display: 'block', height: '100%' }}>
                <Network className="service-icon" />
                <h3>DataOps: Databricks & Airflow</h3>
                <p>Unlock the full potential of your data with scalable DataOps practices, resilient pipelines and modern data lakehouses.</p>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link to="/services/db-migration" className="service-card" style={{ display: 'block', height: '100%' }}>
                <ShieldCheck className="service-icon" />
                <h3>Database Migration</h3>
                <p>Seamlessly migrate your legacy databases to modern, cloud-native solutions like Spanner and Cloud SQL with zero downtime.</p>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Link to="/services/cloud-migration" className="service-card" style={{ display: 'block', height: '100%' }}>
                <Network className="service-icon" />
                <h3>Cloud to Cloud Migration</h3>
                <p>Strategically move your workloads between cloud providers (e.g. Azure to GCP) to optimize costs, enhance performance, and leverage ecosystems.</p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section for SEO */}
      <section id="about" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div className="stats-grid" style={{ gridTemplateColumns: '1fr' }}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
              <h2 className="text-title mb-6">The Engineer Behind the Architecture</h2>
              <p className="mb-8" style={{ fontSize: 'min(1.2rem, 4vw)' }}>
                As a seasoned <strong>Software Engineer</strong> and <strong>DevOps Specialist</strong>, Abhishek Pathak brings years of experience in building high-scale distributed systems and intelligent AI platforms. My mission is to bridge the gap between complex codebases and production-ready infrastructure.
              </p>
              <div className="hero-buttons" style={{ justifyContent: 'center' }}>
                <a href="https://www.linkedin.com/in/abhishekpathakk9/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  View LinkedIn Profile
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
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
              <div className="stat-number"><Counter value="500" /></div>
              <div className="stat-label">Fortune 500 Trusted</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="stat-number"><Counter value="99.99%" /></div>
              <div className="stat-label">Uptime Delivered</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="stat-number"><Counter value="50" />M+</div>
              <div className="stat-label">Daily Predictions</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="stat-number"><Counter value="40%" /></div>
              <div className="stat-label">Faster Deployment</div>
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

      {/* Testimonials */}
      <section id="testimonials" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <motion.div 
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Client Success Stories</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Hear from leaders who have transformed their infrastructure with our expertise.</p>
          </motion.div>
          <TestimonialSlider />
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
    </>
  );
};

export default Home;
