import React, { useState } from 'react';
import IndustrialTraining from '../components/IndustrialTraining';
import { motion } from 'framer-motion';

const IndustrialTrainingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '3rd Year'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error("Enrollment failed", await res.text());
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      console.error("Network error during enrollment", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div>
      {/* Reusing the IndustrialTraining component for the upper content */}
      <IndustrialTraining />

      {/* Enrollment Form Section */}
      <section id="enroll" className="section" style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Enroll Now</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Secure your spot in the next Industrial Training cohort.</p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel" 
                style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px', border: '1px solid var(--color-accent)' }}
              >
                <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '2rem' }}>Application Received!</h3>
                <p>We've received your enrollment details. Our team will contact you shortly.</p>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="glass-panel" 
                style={{ padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }} placeholder="John Doe" />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }} placeholder="john@example.com" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }} placeholder="+91 9876543210" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>College / University</label>
                  <input type="text" name="college" required value={formData.college} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }} placeholder="e.g. Graphic Era Dehradun" />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Current Year</label>
                  <select name="year" value={formData.year} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduated">Graduated / Working</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}>
                  Submit Application
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustrialTrainingPage;
