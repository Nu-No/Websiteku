import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero" style={heroStyle}>
      <div className="overlay" style={overlayStyle}></div>
      <div className="container" style={containerStyle}>
        <div className="hero-content" style={heroContentStyle}>
          <h1 style={headingStyle}>Kesehatan Anda Adalah Prioritas Kami</h1>
          <p style={paragraphStyle}>
            Dapatkan layanan kesehatan terbaik dengan dokter-dokter profesional dan fasilitas modern. 
            Kami berkomitmen untuk memberikan perawatan yang berpusat pada pasien.
          </p>
          <div style={buttonGroupStyle}>
            <Link to="/janji-temu" className="btn btn-primary" style={primaryButtonStyle}>
              Buat Janji Temu
            </Link>
            <Link to="/layanan" className="btn btn-outline" style={outlineButtonStyle}>
              Layanan Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Inline styles
const heroStyle = {
  height: '100vh',
  minHeight: '600px',
  backgroundImage: 'url(https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 1,
};

const containerStyle = {
  position: 'relative',
  zIndex: 2,
};

const heroContentStyle = {
  maxWidth: '650px',
  padding: '20px',
};

const headingStyle = {
  fontSize: '3.5rem',
  fontWeight: '700',
  marginBottom: '20px',
  lineHeight: 1.2,
};

const paragraphStyle = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  lineHeight: 1.6,
};

const buttonGroupStyle = {
  display: 'flex',
  gap: '15px',
  flexWrap: 'wrap',
};

const primaryButtonStyle = {
  padding: '12px 25px',
  fontSize: '1.1rem',
  fontWeight: '500',
};

const outlineButtonStyle = {
  padding: '12px 25px',
  fontSize: '1.1rem',
  fontWeight: '500',
  backgroundColor: 'transparent',
  border: '2px solid white',
  color: 'white',
};

export default Hero;