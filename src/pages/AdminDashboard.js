import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorManagement from '../components/DoctorManagement';
import ServiceManagement from '../components/ServiceManagement';
import ArticleManagement from '../components/ArticleManagement';
import PatientManagement from '../components/PatientManagement';
import AppointmentManagement from '../components/AppointmentManagement';
import SettingsManagement from '../components/SettingsManagement';

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalPatients: 1247,
    totalDoctors: 24,
    totalAppointments: 89,
    totalArticles: 15
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || token !== 'admin-authenticated') {
      navigate('/admin/login');
      return;
    }

    if (user) {
      setAdminUser(JSON.parse(user));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'overview', icon: 'fas fa-chart-line', label: 'Overview', active: true },
    { id: 'patients', icon: 'fas fa-users', label: 'Pasien' },
    { id: 'doctors', icon: 'fas fa-user-md', label: 'Dokter' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Janji Temu' },
    { id: 'services', icon: 'fas fa-stethoscope', label: 'Layanan' },
    { id: 'articles', icon: 'fas fa-newspaper', label: 'Artikel' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Pengaturan' }
  ];

  if (!adminUser) {
    return (
      <div style={loadingStyle}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '24px' }}></i>
        <p>Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={dashboardStyle}>
      {/* Sidebar */}
      <div className="sidebar" style={sidebarStyle}>
        <div className="sidebar-header" style={sidebarHeaderStyle}>
          <div style={logoStyle}>
            <i className="fas fa-hospital" style={logoIconStyle}></i>
            <span style={logoTextStyle}>MedCare Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav" style={sidebarNavStyle}>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...navItemStyle,
                backgroundColor: activeTab === item.id ? '#e3f2fd' : 'transparent',
                color: activeTab === item.id ? '#1a73e8' : '#5f6368'
              }}
            >
              <i className={item.icon} style={navIconStyle}></i>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={sidebarFooterStyle}>
          <button onClick={handleLogout} style={logoutButtonStyle}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
            Keluar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" style={mainContentStyle}>
        {/* Header */}
        <div className="content-header" style={contentHeaderStyle}>
          <div>
            <h1 style={pageTitle}>Dashboard Administrator</h1>
            <p style={pageSubtitle}>Selamat datang, {adminUser.username}</p>
          </div>
          <div style={headerActionsStyle}>
            <span style={lastLoginStyle}>
              Login: {new Date(adminUser.loginTime).toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area" style={contentAreaStyle}>
          {activeTab === 'overview' && (
            <div className="overview-content">
              {/* Stats Cards */}
              <div style={statsGridStyle}>
                <div style={statCardStyle}>
                  <div style={statIconContainerStyle}>
                    <i className="fas fa-users" style={{...statIconStyle, color: '#1a73e8'}}></i>
                  </div>
                  <div style={statContentStyle}>
                    <h3 style={statNumberStyle}>{stats.totalPatients}</h3>
                    <p style={statLabelStyle}>Total Pasien</p>
                  </div>
                </div>

                <div style={statCardStyle}>
                  <div style={statIconContainerStyle}>
                    <i className="fas fa-user-md" style={{...statIconStyle, color: '#34a853'}}></i>
                  </div>
                  <div style={statContentStyle}>
                    <h3 style={statNumberStyle}>{stats.totalDoctors}</h3>
                    <p style={statLabelStyle}>Total Dokter</p>
                  </div>
                </div>

                <div style={statCardStyle}>
                  <div style={statIconContainerStyle}>
                    <i className="fas fa-calendar-alt" style={{...statIconStyle, color: '#ea4335'}}></i>
                  </div>
                  <div style={statContentStyle}>
                    <h3 style={statNumberStyle}>{stats.totalAppointments}</h3>
                    <p style={statLabelStyle}>Janji Temu Hari Ini</p>
                  </div>
                </div>

                <div style={statCardStyle}>
                  <div style={statIconContainerStyle}>
                    <i className="fas fa-newspaper" style={{...statIconStyle, color: '#f4b400'}}></i>
                  </div>
                  <div style={statContentStyle}>
                    <h3 style={statNumberStyle}>{stats.totalArticles}</h3>
                    <p style={statLabelStyle}>Artikel Kesehatan</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={quickActionsStyle}>
                <h3 style={sectionTitleStyle}>Aksi Cepat</h3>
                <div style={actionsGridStyle}>
                  <button 
                    onClick={() => setActiveTab('doctors')}
                    style={actionButtonStyle}
                  >
                    <i className="fas fa-plus" style={actionIconStyle}></i>
                    Tambah Dokter
                  </button>
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    style={actionButtonStyle}
                  >
                    <i className="fas fa-calendar-plus" style={actionIconStyle}></i>
                    Buat Janji Temu
                  </button>
                  <button 
                    onClick={() => setActiveTab('articles')}
                    style={actionButtonStyle}
                  >
                    <i className="fas fa-edit" style={actionIconStyle}></i>
                    Tulis Artikel
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    style={actionButtonStyle}
                  >
                    <i className="fas fa-cog" style={actionIconStyle}></i>
                    Pengaturan
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'patients' && <PatientManagement />}
          {activeTab === 'doctors' && <DoctorManagement />}
          {activeTab === 'services' && <ServiceManagement />}
          {activeTab === 'articles' && <ArticleManagement />}

          {activeTab === 'appointments' && <AppointmentManagement />}
          {activeTab === 'settings' && <SettingsManagement />}
        </div>
      </div>
    </div>
  );
};

// Styles
const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  color: '#5f6368',
};

const dashboardStyle = {
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f8f9fa',
};

const sidebarStyle = {
  width: '250px',
  backgroundColor: 'white',
  borderRight: '1px solid #dadce0',
  display: 'flex',
  flexDirection: 'column',
};

const sidebarHeaderStyle = {
  padding: '20px',
  borderBottom: '1px solid #dadce0',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoIconStyle = {
  fontSize: '24px',
  color: '#1a73e8',
  marginRight: '12px',
};

const logoTextStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
};

const sidebarNavStyle = {
  flex: 1,
  padding: '20px 0',
};

const navItemStyle = {
  width: '100%',
  padding: '12px 20px',
  border: 'none',
  background: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  transition: 'all 0.3s ease',
};

const navIconStyle = {
  width: '20px',
  marginRight: '12px',
};

const sidebarFooterStyle = {
  padding: '20px',
  borderTop: '1px solid #dadce0',
};

const logoutButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#ea4335',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const contentHeaderStyle = {
  backgroundColor: 'white',
  padding: '20px 30px',
  borderBottom: '1px solid #dadce0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const pageTitle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#202124',
  margin: '0 0 4px 0',
};

const pageSubtitle = {
  fontSize: '14px',
  color: '#5f6368',
  margin: 0,
};

const headerActionsStyle = {
  display: 'flex',
  alignItems: 'center',
};

const lastLoginStyle = {
  fontSize: '12px',
  color: '#5f6368',
};

const contentAreaStyle = {
  flex: 1,
  padding: '30px',
  overflow: 'auto',
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginBottom: '30px',
};

const statCardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
};

const statIconContainerStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '15px',
};

const statIconStyle = {
  fontSize: '20px',
};

const statContentStyle = {
  flex: 1,
};

const statNumberStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#202124',
  margin: '0 0 4px 0',
};

const statLabelStyle = {
  fontSize: '14px',
  color: '#5f6368',
  margin: 0,
};

const quickActionsStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
  marginBottom: '15px',
};

const actionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px',
};

const actionButtonStyle = {
  padding: '15px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  color: '#202124',
  transition: 'all 0.3s ease',
};

const actionIconStyle = {
  marginRight: '10px',
  color: '#1a73e8',
};

const comingSoonStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  color: '#5f6368',
};

const comingSoonIconStyle = {
  fontSize: '48px',
  marginBottom: '20px',
  color: '#dadce0',
};

export default AdminDashboard;