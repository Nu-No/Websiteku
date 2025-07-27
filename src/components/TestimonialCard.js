import React from 'react';

const TestimonialCard = ({ image, name, age, testimonial, rating }) => {
  return (
    <div className="testimonial-card" style={cardStyle}>
      <div className="testimonial-rating" style={ratingStyle}>
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fas fa-star ${i < rating ? 'filled' : ''}`} 
            style={i < rating ? starFilledStyle : starEmptyStyle}
          ></i>
        ))}
      </div>
      <p className="testimonial-text" style={testimonialStyle}>"{testimonial}"</p>
      <div className="testimonial-author" style={authorStyle}>
        <img src={image} alt={name} style={imageStyle} />
        <div className="author-info" style={authorInfoStyle}>
          <h4 style={nameStyle}>{name}</h4>
          <p style={ageStyle}>{age} tahun</p>
        </div>
      </div>
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

const ratingStyle = {
  marginBottom: '20px',
};

const starFilledStyle = {
  color: '#f4b400',
  marginRight: '2px',
};

const starEmptyStyle = {
  color: '#dadce0',
  marginRight: '2px',
};

const testimonialStyle = {
  fontSize: '1.1rem',
  lineHeight: 1.6,
  color: '#5f6368',
  marginBottom: '25px',
  flex: 1,
  fontStyle: 'italic',
};

const authorStyle = {
  display: 'flex',
  alignItems: 'center',
};

const imageStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '15px',
  border: '3px solid #1a73e8',
};

const authorInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const nameStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#202124',
  margin: 0,
};

const ageStyle = {
  color: '#5f6368',
  margin: 0,
};

export default TestimonialCard;