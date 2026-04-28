import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content: "Abhishek transformed our entire ML pipeline. What used to take days now deploys in minutes. His expertise in Kubernetes and scalable architecture is unmatched.",
    author: "Sarah Jenkins",
    role: "CTO, DataTech Solutions",
    company: "DataTech"
  },
  {
    id: 2,
    content: "Working with Abhishek was a game-changer for our cloud infrastructure. He brought our AWS costs down by 40% while improving system reliability and performance.",
    author: "Michael Chen",
    role: "VP of Engineering, CloudScale",
    company: "CloudScale"
  },
  {
    id: 3,
    content: "An exceptional DevOps engineer and AI consultant. He doesn't just write code; he architects solutions that align perfectly with business goals. Highly recommended.",
    author: "Elena Rodriguez",
    role: "Director of AI, NeuralWorks",
    company: "NeuralWorks"
  },
  {
    id: 4,
    content: "His deep understanding of both Data Science and DevOps bridges a critical gap in our team. We successfully launched our GenAI product months ahead of schedule.",
    author: "David Smith",
    role: "Founder, NextGen AI",
    company: "NextGen AI"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="testimonial-slider">
      <div className="testimonial-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="testimonial-content"
          >
            <svg className="quote-icon" width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 0C6.04416 0 0 6.04416 0 13.5V36H18V13.5H9C9 8.52942 13.0294 4.5 18 4.5V0H13.5ZM40.5 0C33.0442 0 27 6.04416 27 13.5V36H45V13.5H36C36 8.52942 40.0294 4.5 45 4.5V0H40.5Z" fill="currentColor" fillOpacity="0.1"/>
            </svg>
            <p className="testimonial-text">"{testimonials[currentIndex].content}"</p>
            <div className="testimonial-author">
              <h4>{testimonials[currentIndex].author}</h4>
              <p>{testimonials[currentIndex].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="slider-controls">
        <button onClick={prevSlide} className="slider-btn" aria-label="Previous Testimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="slider-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="slider-btn" aria-label="Next Testimonial">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
