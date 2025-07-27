import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/footer.css';
import logo from '../assets/images/logo-white.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-about">
            <div className="footer-logo">
              <img src={logo} alt="MedCare Logo" />
              <h2>MedCare</h2>
            </div>
            <p>
              Kami berkomitmen untuk memberikan layanan kesehatan terbaik dengan pendekatan yang berpusat pada pasien, teknologi modern, dan tim medis profesional.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Tautan Cepat</h3>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/layanan">Layanan</Link></li>
              <li><Link to="/dokter">Dokter</Link></li>
              <li><Link to="/artikel">Artikel</Link></li>
              <li><Link to="/tentang">Tentang Kami</Link></li>
              <li><Link to="/kontak">Kontak</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Layanan Kami</h3>
            <ul>
              <li><Link to="/layanan/konsultasi">Konsultasi Dokter</Link></li>
              <li><Link to="/layanan/pemeriksaan">Pemeriksaan Kesehatan</Link></li>
              <li><Link to="/layanan/laboratorium">Tes Laboratorium</Link></li>
              <li><Link to="/layanan/vaksinasi">Vaksinasi</Link></li>
              <li><Link to="/layanan/farmasi">Layanan Farmasi</Link></li>
              <li><Link to="/layanan/gawat-darurat">Gawat Darurat</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Hubungi Kami</h3>
            <div className="contact-info">
              <i className="fas fa-map-marker-alt"></i>
              <p>Jl. Kesehatan No. 123, Jakarta Selatan, Indonesia</p>
            </div>
            <div className="contact-info">
              <i className="fas fa-phone-alt"></i>
              <p>+62 21 1234 5678</p>
            </div>
            <div className="contact-info">
              <i className="fas fa-envelope"></i>
              <p>info@medcare.id</p>
            </div>
            <div className="contact-info">
              <i className="fas fa-clock"></i>
              <p>Senin - Sabtu: 08:00 - 20:00<br />Minggu: 08:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} MedCare. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;