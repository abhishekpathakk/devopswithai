import React from 'react';

const companies = [
  "Costco", "FedEx", "Hyundai", "Cloudflare", "Workday", "Cisco", 
  "LinkedIn", "Klarna", "Vanta", "Lyft", "Rippling",
  "Coinbase", "Monday.com", "Bridgewater", "Abridge", "Mercor"
];

const LogoTicker = () => {
  return (
    <div className="logo-ticker-section">
      <p className="ticker-heading">Modernizing enterprise platforms & driving AI innovation across global leaders</p>
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
