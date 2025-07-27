import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import DoctorCard from '../components/DoctorCard';
import TestimonialCard from '../components/TestimonialCard';
import ArticleCard from '../components/ArticleCard';

const Home = () => {
  // Sample data for services
  const services = [
    {
      id: 1,
      icon: 'fas fa-stethoscope',
      title: 'Konsultasi Dokter',
      description: 'Konsultasi dengan dokter spesialis berpengalaman untuk mendapatkan diagnosis dan perawatan terbaik.',
      link: '/layanan/konsultasi'
    },
    {
      id: 2,
      icon: 'fas fa-heartbeat',
      title: 'Pemeriksaan Kesehatan',
      description: 'Pemeriksaan kesehatan menyeluruh untuk mendeteksi masalah kesehatan sejak dini.',
      link: '/layanan/pemeriksaan'
    },
    {
      id: 3,
      icon: 'fas fa-flask',
      title: 'Tes Laboratorium',
      description: 'Layanan tes laboratorium lengkap dengan hasil yang cepat dan akurat.',
      link: '/layanan/laboratorium'
    },
    {
      id: 4,
      icon: 'fas fa-syringe',
      title: 'Vaksinasi',
      description: 'Program vaksinasi untuk semua usia untuk mencegah berbagai penyakit menular.',
      link: '/layanan/vaksinasi'
    },
    {
      id: 5,
      icon: 'fas fa-pills',
      title: 'Layanan Farmasi',
      description: 'Apotek lengkap dengan obat-obatan berkualitas dan konsultasi farmasi.',
      link: '/layanan/farmasi'
    },
    {
      id: 6,
      icon: 'fas fa-ambulance',
      title: 'Gawat Darurat',
      description: 'Layanan gawat darurat 24 jam dengan tim medis yang siap siaga.',
      link: '/layanan/gawat-darurat'
    }
  ];

  // Sample data for doctors
  const doctors = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Andi Wijaya',
      specialty: 'Dokter Umum',
      rating: 4.8,
      experience: 10
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Siti Rahmah',
      specialty: 'Dokter Anak',
      rating: 4.9,
      experience: 12
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Budi Santoso',
      specialty: 'Dokter Jantung',
      rating: 4.7,
      experience: 15
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Maya Putri',
      specialty: 'Dokter Kulit',
      rating: 4.6,
      experience: 8
    }
  ];

  // Sample data for testimonials
  const testimonials = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dewi Lestari',
      age: 35,
      testimonial: 'Pelayanan sangat profesional dan ramah. Dokter menjelaskan kondisi saya dengan detail dan memberikan solusi yang tepat. Sangat merekomendasikan!',
      rating: 5
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Ahmad Rizki',
      age: 42,
      testimonial: 'Fasilitas modern dan bersih. Proses pendaftaran sangat mudah dan tidak perlu menunggu lama. Dokter dan staf sangat membantu.',
      rating: 4
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Sinta Dewi',
      age: 28,
      testimonial: 'Saya sangat puas dengan layanan yang diberikan. Dokter sangat teliti dalam memeriksa dan memberikan penjelasan yang mudah dimengerti.',
      rating: 5
    }
  ];

  // Sample data for articles
  const articles = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      title: 'Tips Menjaga Kesehatan Jantung di Era Digital',
      category: 'Kesehatan Jantung',
      date: '15 Juni 2023',
      excerpt: 'Pola hidup di era digital dapat berdampak pada kesehatan jantung. Simak tips-tips untuk menjaga kesehatan jantung Anda.',
      author: 'Dr. Budi Santoso'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      title: 'Pentingnya Nutrisi Seimbang untuk Anak dalam Masa Pertumbuhan',
      category: 'Kesehatan Anak',
      date: '10 Juni 2023',
      excerpt: 'Nutrisi yang tepat sangat penting untuk pertumbuhan dan perkembangan anak. Pelajari cara menyusun menu seimbang untuk anak Anda.',
      author: 'Dr. Siti Rahmah'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      title: 'Cara Efektif Mengelola Stres di Tempat Kerja',
      category: 'Kesehatan Mental',
      date: '5 Juni 2023',
      excerpt: 'Stres di tempat kerja dapat berdampak pada kesehatan fisik dan mental. Temukan cara-cara efektif untuk mengelola stres.',
      author: 'Dr. Maya Putri'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="section services-section" style={sectionStyle}>
        <div className="container">
          <h2 className="section-title" style={sectionTitleStyle}>Layanan Kami</h2>
          <p className="section-subtitle" style={sectionSubtitleStyle}>
            Kami menyediakan berbagai layanan kesehatan berkualitas untuk memenuhi kebutuhan Anda dan keluarga
          </p>

          <div className="services-grid" style={servicesGridStyle}>
            {services.map(service => (
              <div key={service.id} style={serviceItemStyle}>
                <ServiceCard 
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  link={service.link}
                />
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/layanan" className="btn btn-primary" style={viewAllButtonStyle}>
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section" style={aboutSectionStyle}>
        <div className="container">
          <div className="about-grid" style={aboutGridStyle}>
            <div className="about-image" style={aboutImageContainerStyle}>
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" 
                alt="Tentang MedCare" 
                style={aboutImageStyle} 
              />
            </div>
            <div className="about-content" style={aboutContentStyle}>
              <h2 style={aboutTitleStyle}>Tentang MedCare</h2>
              <p style={aboutTextStyle}>
                MedCare adalah penyedia layanan kesehatan terpercaya yang berkomitmen untuk memberikan perawatan berkualitas tinggi dengan pendekatan yang berpusat pada pasien.
              </p>
              <p style={aboutTextStyle}>
                Didirikan pada tahun 2010, MedCare telah melayani ribuan pasien dengan berbagai kebutuhan kesehatan. Kami memiliki tim dokter dan tenaga medis yang berpengalaman, didukung oleh fasilitas dan teknologi modern.
              </p>
              <p style={aboutTextStyle}>
                Misi kami adalah menjadi mitra kesehatan terpercaya bagi masyarakat Indonesia dengan menyediakan layanan kesehatan yang terjangkau, berkualitas, dan mudah diakses.
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link to="/tentang" className="btn btn-primary" style={aboutButtonStyle}>
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="section doctors-section" style={sectionStyle}>
        <div className="container">
          <h2 className="section-title" style={sectionTitleStyle}>Dokter Kami</h2>
          <p className="section-subtitle" style={sectionSubtitleStyle}>
            Tim dokter profesional dan berpengalaman siap memberikan perawatan terbaik untuk Anda
          </p>

          <div className="doctors-grid" style={doctorsGridStyle}>
            {doctors.map(doctor => (
              <div key={doctor.id} style={doctorItemStyle}>
                <DoctorCard 
                  id={doctor.id}
                  image={doctor.image}
                  name={doctor.name}
                  specialty={doctor.specialty}
                  rating={doctor.rating}
                  experience={doctor.experience}
                />
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/dokter" className="btn btn-primary" style={viewAllButtonStyle}>
              Lihat Semua Dokter
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section" style={statsSectionStyle}>
        <div className="overlay" style={statsOverlayStyle}></div>
        <div className="container" style={statsContainerStyle}>
          <div className="stats-grid" style={statsGridStyle}>
            <div className="stat-item" style={statItemStyle}>
              <div className="stat-icon" style={statIconStyle}>
                <i className="fas fa-user-md" style={statIconInnerStyle}></i>
              </div>
              <h3 style={statNumberStyle}>50+</h3>
              <p style={statTextStyle}>Dokter Spesialis</p>
            </div>
            <div className="stat-item" style={statItemStyle}>
              <div className="stat-icon" style={statIconStyle}>
                <i className="fas fa-procedures" style={statIconInnerStyle}></i>
              </div>
              <h3 style={statNumberStyle}>10,000+</h3>
              <p style={statTextStyle}>Pasien Puas</p>
            </div>
            <div className="stat-item" style={statItemStyle}>
              <div className="stat-icon" style={statIconStyle}>
                <i className="fas fa-hospital" style={statIconInnerStyle}></i>
              </div>
              <h3 style={statNumberStyle}>5</h3>
              <p style={statTextStyle}>Lokasi Klinik</p>
            </div>
            <div className="stat-item" style={statItemStyle}>
              <div className="stat-icon" style={statIconStyle}>
                <i className="fas fa-award" style={statIconInnerStyle}></i>
              </div>
              <h3 style={statNumberStyle}>15+</h3>
              <p style={statTextStyle}>Tahun Pengalaman</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section" style={sectionStyle}>
        <div className="container">
          <h2 className="section-title" style={sectionTitleStyle}>Apa Kata Pasien Kami</h2>
          <p className="section-subtitle" style={sectionSubtitleStyle}>
            Pengalaman nyata dari pasien yang telah menggunakan layanan kesehatan kami
          </p>

          <div className="testimonials-grid" style={testimonialsGridStyle}>
            {testimonials.map(testimonial => (
              <div key={testimonial.id} style={testimonialItemStyle}>
                <TestimonialCard 
                  image={testimonial.image}
                  name={testimonial.name}
                  age={testimonial.age}
                  testimonial={testimonial.testimonial}
                  rating={testimonial.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="section articles-section" style={sectionStyle}>
        <div className="container">
          <h2 className="section-title" style={sectionTitleStyle}>Artikel Kesehatan Terbaru</h2>
          <p className="section-subtitle" style={sectionSubtitleStyle}>
            Informasi dan tips kesehatan terkini dari para ahli kami
          </p>

          <div className="articles-grid" style={articlesGridStyle}>
            {articles.map(article => (
              <div key={article.id} style={articleItemStyle}>
                <ArticleCard 
                  id={article.id}
                  image={article.image}
                  title={article.title}
                  category={article.category}
                  date={article.date}
                  excerpt={article.excerpt}
                  author={article.author}
                />
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '40px' }}>
            <Link to="/artikel" className="btn btn-primary" style={viewAllButtonStyle}>
              Lihat Semua Artikel
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section" style={ctaSectionStyle}>
        <div className="overlay" style={ctaOverlayStyle}></div>
        <div className="container" style={ctaContainerStyle}>
          <h2 style={ctaTitleStyle}>Butuh Konsultasi Kesehatan?</h2>
          <p style={ctaTextStyle}>
            Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda dengan kebutuhan kesehatan Anda.
          </p>
          <div style={ctaButtonsStyle}>
            <Link to="/janji-temu" className="btn btn-primary" style={ctaPrimaryButtonStyle}>
              Buat Janji Temu
            </Link>
            <Link to="/kontak" className="btn btn-outline" style={ctaOutlineButtonStyle}>
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Inline styles
const sectionStyle = {
  padding: '80px 0',
};

const sectionTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '15px',
  textAlign: 'center',
  color: '#202124',
};

const sectionSubtitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '50px',
  textAlign: 'center',
  color: '#5f6368',
  maxWidth: '800px',
  margin: '0 auto 50px',
};

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '30px',
};

const serviceItemStyle = {
  height: '100%',
};

const viewAllButtonStyle = {
  padding: '12px 25px',
  fontSize: '1.1rem',
  fontWeight: '500',
};

const aboutSectionStyle = {
  padding: '80px 0',
  backgroundColor: '#f8f9fa',
};

const aboutGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '50px',
  alignItems: 'center',
};

const aboutImageContainerStyle = {
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
};

const aboutImageStyle = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const aboutContentStyle = {
  padding: '20px',
};

const aboutTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '20px',
  color: '#202124',
};

const aboutTextStyle = {
  fontSize: '1.1rem',
  marginBottom: '15px',
  color: '#5f6368',
  lineHeight: 1.6,
};

const aboutButtonStyle = {
  padding: '12px 25px',
  fontSize: '1.1rem',
  fontWeight: '500',
};

const doctorsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '30px',
};

const doctorItemStyle = {
  height: '100%',
};

const statsSectionStyle = {
  padding: '100px 0',
  backgroundImage: 'url(https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: 'white',
};

const statsOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(26, 115, 232, 0.85)',
};

const statsContainerStyle = {
  position: 'relative',
  zIndex: 2,
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '30px',
  textAlign: 'center',
};

const statItemStyle = {
  padding: '20px',
};

const statIconStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
};

const statIconInnerStyle = {
  fontSize: '35px',
  color: 'white',
};

const statNumberStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '10px',
};

const statTextStyle = {
  fontSize: '1.2rem',
  opacity: 0.9,
};

const testimonialsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '30px',
};

const testimonialItemStyle = {
  height: '100%',
};

const articlesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '30px',
};

const articleItemStyle = {
  height: '100%',
};

const ctaSectionStyle = {
  padding: '100px 0',
  backgroundImage: 'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: 'white',
  textAlign: 'center',
};

const ctaOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

const ctaContainerStyle = {
  position: 'relative',
  zIndex: 2,
  maxWidth: '800px',
  margin: '0 auto',
};

const ctaTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  marginBottom: '20px',
};

const ctaTextStyle = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  opacity: 0.9,
};

const ctaButtonsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
};

const ctaPrimaryButtonStyle = {
  padding: '15px 30px',
  fontSize: '1.1rem',
  fontWeight: '500',
};

const ctaOutlineButtonStyle = {
  padding: '15px 30px',
  fontSize: '1.1rem',
  fontWeight: '500',
  backgroundColor: 'transparent',
  border: '2px solid white',
  color: 'white',
};

export default Home;