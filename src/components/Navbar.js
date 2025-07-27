import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/css/navbar.css';
import logo from '../assets/images/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Layanan Kesehatan Logo" />
          <h1>MedCare</h1>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Beranda
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/layanan" 
              className={`navbar-link ${location.pathname === '/layanan' ? 'active' : ''}`}
            >
              Layanan
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/dokter" 
              className={`navbar-link ${location.pathname === '/dokter' ? 'active' : ''}`}
            >
              Dokter
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/artikel" 
              className={`navbar-link ${location.pathname === '/artikel' ? 'active' : ''}`}
            >
              Artikel
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/tentang" 
              className={`navbar-link ${location.pathname === '/tentang' ? 'active' : ''}`}
            >
              Tentang Kami
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/kontak" 
              className={`navbar-link ${location.pathname === '/kontak' ? 'active' : ''}`}
            >
              Kontak
            </Link>
          </li>
          <li className="navbar-item navbar-cta">
            <Link to="/janji-temu" className="btn btn-primary">
              Buat Janji
            </Link>
          </li>
          <li className="navbar-item navbar-admin">
            <Link 
              to="/admin/login" 
              className="navbar-link admin-link"
              title="Admin Panel"
            >
              <i className="fas fa-user-shield"></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;