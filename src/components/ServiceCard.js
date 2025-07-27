import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <div className="service-card" style={cardStyle}>
      <div className="service-icon" style={iconStyle}>
        <i className={icon} style={iconInnerStyle}></i>
      </div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
      <Link to={link} style={linkStyle}>
        Selengkapnya <i className="fas fa-arrow-right" style={{ marginLeft: '5px' }}></i>
      </Link>
    </div>
  );
};

// Inline styles
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '30px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const iconStyle = {
  width: '70px',
  height: '70px',
  borderRadius: '50%',
  backgroundColor: 'rgba(26, 115, 232, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
};

const iconInnerStyle = {
  fontSize: '28px',
  color: '#1a73e8',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  marginBottom: '15px',
  color: '#202124',
};

const descriptionStyle = {
  color: '#5f6368',
  marginBottom: '20px',
  flex: 1,
};

const linkStyle = {
  color: '#1a73e8',
  fontWeight: '500',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
};

export default ServiceCard;