import React from 'react';
import { motion } from 'framer-motion';

const PipelineAnimation = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 0.5 + i * 0.3;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  const labels = ["Build", "Observe", "Evaluate", "Deploy"];
  const xPositions = [200, 400, 600, 800];

  return (
    <div className="pipeline-container">
      <div className="pipeline-labels" style={{ top: '20px' }}>
        {labels.map((label, idx) => (
          <motion.div 
            key={idx} 
            className="pipeline-label" 
            style={{ left: `${(xPositions[idx]/1000)*100}%` }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + idx * 0.1 }}
          >
            {label}
          </motion.div>
        ))}
      </div>
      
      <div className="pipeline-svg-wrapper">
        <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="pipeline-svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(100, 150, 255, 0.1)" />
              <stop offset="50%" stopColor="rgba(100, 150, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(100, 150, 255, 1)" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Paths */}
          {xPositions.map((x, i) => (
            <path
              key={`bg-${i}`}
              d={`M ${x} 50 C ${x} 150, 500 200, 500 250`}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
          ))}
          <path d="M 500 250 L 500 400" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

          {/* Animated Paths */}
          {xPositions.map((x, i) => (
            <motion.path
              key={`path-${i}`}
              d={`M ${x} 50 C ${x} 150, 500 200, 500 250`}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={draw}
            />
          ))}
          <motion.path 
            d="M 500 250 L 500 400" 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="3"
            filter="url(#glow)"
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={draw}
          />
          
          {/* Glowing Drop at the end */}
          <motion.circle 
            cx="500" 
            cy="400" 
            r="4" 
            fill="#fff" 
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
            viewport={{ once: true }}
          />
        </svg>
      </div>
    </div>
  );
};

export default PipelineAnimation;
