import React from 'react';

const companies = [
  "Klarna", "Vanta", "Clay", "Rippling", "Lyft", 
  "Harvey", "Abridge", "Cloudflare", "Workday", "Cisco", 
  "Mercor", "Nu", "Monday.com", "Podium", "Bridgewater", 
  "LinkedIn", "Coinbase"
];

const LogoTicker = () => {
  return (
    <div className="logo-ticker-section">
      <p className="ticker-heading">Technologies powering top AI teams, from startups to global enterprises</p>
      <div className="ticker-wrapper">
        <div className="ticker-track">
          {/* First set of logos */}
          {companies.map((logo, index) => (
            <div key={`logo-1-${index}`} className="ticker-item">
              <span className="ticker-logo-text">{logo}</span>
            </div>
          ))}
          {/* Duplicated for infinite scroll effect */}
          {companies.map((logo, index) => (
            <div key={`logo-2-${index}`} className="ticker-item">
              <span className="ticker-logo-text">{logo}</span>
            </div>
          ))}
          {/* Triple for very wide screens */}
          {companies.map((logo, index) => (
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
