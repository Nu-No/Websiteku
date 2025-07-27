import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import TelemedicineChat from './components/TelemedicineChat';
import './assets/css/main.css';
import './assets/css/telemedicine.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="main-content">
                <Home />
              </main>
              <Footer />
              <TelemedicineChat />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          
          {/* Other Routes */}
          {/* <Route path="/layanan" element={<Services />} /> */}
          {/* <Route path="/dokter" element={<Doctors />} /> */}
          {/* <Route path="/artikel" element={<Articles />} /> */}
          {/* <Route path="/tentang" element={<About />} /> */}
          {/* <Route path="/kontak" element={<Contact />} /> */}
          {/* <Route path="/janji-temu" element={<Appointment />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;