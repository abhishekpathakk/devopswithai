import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Users, Code, Award, Briefcase, GraduationCap, ArrowRight, Star } from 'lucide-react';

const students = [
  { name: "Aditi S.", pkg: "55 LPA", role: "SDE-2 at Google", college: "VIT Vellore" },
  { name: "Rahul M.", pkg: "24 LPA", role: "DevOps Eng. at Amazon", college: "Dehradun University" },
  { name: "Priya K.", pkg: "18 LPA", role: "Data Eng. at Microsoft", college: "COEP Pune" },
  { name: "Karan V.", pkg: "14 LPA", role: "Cloud Architect at IBM", college: "SRM Chennai" },
  { name: "Sneha P.", pkg: "32 LPA", role: "ML Engineer at Meta", college: "UPES Dehradun" },
  { name: "Aman G.", pkg: "16 LPA", role: "Backend Dev at Swiggy", college: "DTU Delhi" },
  { name: "Neha R.", pkg: "9 LPA", role: "SDE at TCS Digital", college: "Graphic Era Dehradun" },
  { name: "Vikram S.", pkg: "21 LPA", role: "Site Reliability Eng. at Uber", college: "Uttaranchal University" },
  { name: "Riya M.", pkg: "12 LPA", role: "Software Eng. at Infosys", college: "MIT Pune" },
  { name: "Kunal D.", pkg: "45 LPA", role: "AI Researcher at OpenAI", college: "Dehradun University" },
  { name: "Arjun T.", pkg: "28 LPA", role: "Cloud Eng. at GCP", college: "VIT Vellore" },
  { name: "Simran A.", pkg: "15 LPA", role: "SDE at Paytm", college: "NSUT Delhi" },
  { name: "Nikhil B.", pkg: "11 LPA", role: "DevOps Eng. at Wipro", college: "DIT Dehradun" },
  { name: "Pooja C.", pkg: "22 LPA", role: "Data Scientist at Flipkart", college: "PICT Pune" },
  { name: "Rahul D.", pkg: "19 LPA", role: "SDE-1 at Atlassian", college: "SRM Chennai" },
  { name: "Anjali E.", pkg: "14 LPA", role: "Cloud Consultant at Deloitte", college: "Anna University Chennai" },
  { name: "Rohit F.", pkg: "35 LPA", role: "Senior SDE at Netflix", college: "Uttaranchal University" },
  { name: "Meera G.", pkg: "10 LPA", role: "Backend Eng. at Zomato", college: "Symbiosis Pune" },
  { name: "Amit H.", pkg: "17 LPA", role: "DevSecOps at Cisco", college: "Sathyabama Chennai" },
  { name: "Sara I.", pkg: "26 LPA", role: "Platform Eng. at LinkedIn", college: "COEP Pune" }
];

const projects = [
  {
    title: "CQRS Multi-Cloud Migration Engine",
    tech: "Go, Kubernetes, GCP Spanner",
    desc: "Architect a live data migration tool handling 2 million rows with zero downtime using Change Data Capture (CDC)."
  },
  {
    title: "Enterprise RAG Pipeline (GenAI)",
    tech: "Python, LangChain, Pinecone",
    desc: "Build a production-grade Generative AI chatbot securely accessing proprietary enterprise documents with hallucinations prevented."
  },
  {
    title: "Distributed DataOps Lakehouse",
    tech: "Databricks, Apache Airflow",
    desc: "Create scalable real-time streaming ETL pipelines processing terabytes of log data daily with strict governance."
  }
];

const IndustrialTraining = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % students.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const visibleStudents = [];
  for(let i=0; i<4; i++) {
    visibleStudents.push(students[(startIndex + i) % students.length]);
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <section id="training" className="section" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="badge" style={{ marginBottom: '1rem' }}>Industrial Training</div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Get Industrial Training Done From Us</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
              Transition from an academic environment to an elite engineering workflow. Learn directly from industry veterans through live coding sessions.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="training-highlights" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            <motion.div whileHover={{ y: -5 }} className="feature-card glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
              <div className="feature-icon" style={{ backgroundColor: 'rgba(100, 150, 255, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
                <Terminal size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Live Class, Live Code</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>No recorded PPTs. Get your hands dirty in live sessions with elite engineers coding real architectures alongside you.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="feature-card glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
              <div className="feature-icon" style={{ backgroundColor: 'rgba(100, 150, 255, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
                <Briefcase size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>100% Placement Assistance</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Exclusive referrals to top-tier companies, mock interviews, and resume building to secure 10LPA to 50LPA+ packages.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="feature-card glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
              <div className="feature-icon" style={{ backgroundColor: 'rgba(100, 150, 255, 0.1)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Mentorship by Leaders</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Get evaluated by real industry people from Google, Amazon, and Meta. Build a network that accelerates your career.</p>
            </motion.div>
          </div>

          {/* Advanced Projects */}
          <div style={{ marginBottom: '6rem' }}>
            <h3 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>Build Extremely Advanced Projects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {projects.map((proj, idx) => (
                <div key={idx} className="project-card" style={{ border: '1px solid var(--color-border)', borderRadius: '12px', padding: '2rem', transition: 'all 0.3s', backgroundColor: 'var(--color-bg-secondary)' }}>
                  <Code size={32} color="var(--color-accent)" style={{ marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{proj.title}</h4>
                  <div style={{ color: 'var(--color-accent)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{proj.tech}</div>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Testimonials & Packages */}
          <div className="student-wall" style={{ padding: '4rem 2rem', backgroundColor: 'rgba(100, 150, 255, 0.05)', borderRadius: '24px', border: '1px solid var(--color-border)' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Wall of Fame</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Our students from top universities are securing massive packages across the globe.</p>
            </div>
            
            <div className="student-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {visibleStudents.map((student, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="student-card glass-panel" 
                  style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--color-accent)', color: 'var(--color-bg-primary)', padding: '0.25rem 1rem', borderBottomLeftRadius: '12px', fontWeight: '800' }}>
                    {student.pkg}
                  </div>
                  <h4 style={{ fontSize: '1.25rem', marginTop: '1rem' }}>{student.name}</h4>
                  <p style={{ color: 'var(--color-accent)', fontWeight: '500', marginBottom: '0' }}>{student.role}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: 'auto', paddingTop: '1rem' }}>
                    <GraduationCap size={16} /> {student.college}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '1.25rem 3rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Enroll in Industrial Training <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default IndustrialTraining;
