import React from 'react';

// Using simple SVG placeholders or recognizable text for logos to keep it lightweight and zero-dependency
const logos = [
  "Kubernetes", "Docker", "GCP", "AWS", "Azure", "Terraform", "Databricks", "Airflow", "PyTorch", "TensorFlow", "React"
];

const LogoTicker = () => {
  return (
    <div className="logo-ticker-section">
      <p className="ticker-heading">Technologies powering top AI teams, from startups to global enterprises</p>
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="ticker-item">
              <span className="ticker-logo-text">{logo}</span>
            </div>
          ))}
          {/* Duplicated for infinite scroll effect */}
          {logos.map((logo, index) => (
            <div key={`logo-2-${index}`} className="ticker-item">
              <span className="ticker-logo-text">{logo}</span>
            </div>
          ))}
          {/* Triple for very wide screens */}
          {logos.map((logo, index) => (
            <div key={`logo-3-${index}`} className="ticker-item">
              <span className="ticker-logo-text">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
