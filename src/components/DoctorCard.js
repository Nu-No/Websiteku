import React from 'react';
import { Link } from 'react-router-dom';

const DoctorCard = ({ id, image, name, specialty, rating, experience }) => {
  return (
    <div className="doctor-card" style={cardStyle}>
      <div className="doctor-image" style={imageContainerStyle}>
        <img src={image} alt={name} style={imageStyle} />
      </div>
      <div className="doctor-info" style={infoStyle}>
        <h3 style={nameStyle}>{name}</h3>
        <p style={specialtyStyle}>{specialty}</p>
        <div style={ratingStyle}>
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={`fas fa-star ${i < rating ? 'filled' : ''}`} 
              style={i < rating ? starFilledStyle : starEmptyStyle}
            ></i>
          ))}
          <span style={ratingTextStyle}>{rating.toFixed(1)}</span>
        </div>
        <p style={experienceStyle}>
          <i className="fas fa-calendar-check" style={experienceIconStyle}></i> 
          {experience} tahun pengalaman
        </p>
        <div style={buttonContainerStyle}>
          <Link to={`/dokter/${id}`} style={profileButtonStyle}>
            Lihat Profil
          </Link>
          <Link to={`/janji-temu/${id}`} style={appointmentButtonStyle}>
            Buat Janji
          </Link>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const imageContainerStyle = {
  height: '250px',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
};

const infoStyle = {
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const nameStyle = {
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '5px',
  color: '#202124',
};

const specialtyStyle = {
  color: '#1a73e8',
  fontWeight: '500',
  marginBottom: '10px',
};

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const starFilledStyle = {
  color: '#f4b400',
  marginRight: '2px',
};

const starEmptyStyle = {
  color: '#dadce0',
  marginRight: '2px',
};

const ratingTextStyle = {
  marginLeft: '5px',
  fontWeight: '500',
};

const experienceStyle = {
  display: 'flex',
  alignItems: 'center',
  color: '#5f6368',
  marginBottom: '15px',
};

const experienceIconStyle = {
  color: '#34a853',
  marginRight: '8px',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: 'auto',
};

const profileButtonStyle = {
  flex: '1',
  padding: '8px 15px',
  backgroundColor: 'transparent',
  border: '1px solid #1a73e8',
  color: '#1a73e8',
  borderRadius: '4px',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
};

const appointmentButtonStyle = {
  flex: '1',
  padding: '8px 15px',
  backgroundColor: '#1a73e8',
  color: 'white',
  borderRadius: '4px',
  fontWeight: '500',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  textDecoration: 'none',
};

export default DoctorCard;