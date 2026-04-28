import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import NeuralBackground from '../components/NeuralBackground';

const ServicePage = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="section container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Service Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Return Home</Link>
      </div>
    );
  }

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
    <div style={{ paddingTop: '80px' }}>
      {/* Service Hero */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', backgroundColor: 'var(--color-bg-secondary)' }}>
        <NeuralBackground />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '800px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
            <motion.h1 variants={fadeInUp} style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>{service.title}</motion.h1>
            <motion.p variants={fadeInUp} style={{ fontSize: '1.25rem' }}>{service.description}</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="services-grid">
            {service.features.map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="service-card" style={{ padding: '2.5rem 2rem' }}>
                <CheckCircle2 size={36} color="var(--color-accent)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '1rem', marginBottom: 0 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Specific Testimonial */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <svg className="quote-icon" style={{ display: 'inline-block' }} width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0C6.04416 0 0 6.04416 0 13.5V36H18V13.5H9C9 8.52942 13.0294 4.5 18 4.5V0H13.5ZM40.5 0C33.0442 0 27 6.04416 27 13.5V36H45V13.5H36C36 8.52942 40.0294 4.5 45 4.5V0H40.5Z" fill="currentColor" fillOpacity="0.1"/>
            </svg>
            <p style={{ fontSize: '1.5rem', fontStyle: 'italic', margin: '1.5rem 0 2rem', color: 'var(--color-text-primary)' }}>"{service.testimonial.quote}"</p>
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{service.testimonial.author}</h4>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: 0 }}>{service.testimonial.role}</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2>Ready to get started?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>Let's discuss how we can implement {service.title} for your enterprise.</p>
            <Link to="/" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}>
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
