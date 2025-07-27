import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Data admin (dalam implementasi nyata, ini harus dari database)
  const adminCredentials = {
    username: 'admin',
    password: 'medcare2024'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
    setSuccess(''); // Clear success when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validasi input
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Username dan password harus diisi!');
      setIsLoading(false);
      return;
    }

    // Simulasi proses login
    setTimeout(() => {
      if (formData.username === adminCredentials.username && 
          formData.password === adminCredentials.password) {
        // Set session/token (dalam implementasi nyata)
        localStorage.setItem('adminToken', 'admin-authenticated');
        localStorage.setItem('adminUser', JSON.stringify({
          username: formData.username,
          role: 'administrator',
          loginTime: new Date().toISOString(),
          permissions: ['read', 'write', 'delete', 'manage']
        }));
        
        setSuccess('Login berhasil! Mengalihkan ke dashboard...');
        
        // Redirect ke dashboard setelah delay
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      } else {
        setError('Username atau password salah! Silakan coba lagi.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login" style={containerStyle}>
      <div className="login-container" style={loginContainerStyle}>
        <div className="login-header" style={headerStyle}>
          <div style={logoContainerStyle}>
            <i className="fas fa-user-shield" style={logoIconStyle}></i>
          </div>
          <h2 style={titleStyle}>Administrator Login</h2>
          <p style={subtitleStyle}>Masuk ke panel admin MedCare</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={errorStyle}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
              {error}
            </div>
          )}

          {success && (
            <div style={successStyle}>
              <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
              {success}
            </div>
          )}

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Username</label>
            <div style={inputContainerStyle}>
              <i className="fas fa-user" style={inputIconStyle}></i>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Masukkan username"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <div style={inputContainerStyle}>
              <i className="fas fa-lock" style={inputIconStyle}></i>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Masukkan password"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              ...submitButtonStyle,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                Memproses...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i>
                Masuk
              </>
            )}
          </button>
        </form>

        <div style={credentialsInfoStyle}>
          <h4 style={credentialsHeaderStyle}>Kredensial Demo:</h4>
          <p style={credentialsTextStyle}>
            <strong>Username:</strong> admin<br />
            <strong>Password:</strong> medcare2024
          </p>
        </div>

        <div style={footerStyle}>
          <p style={footerTextStyle}>
            © 2024 MedCare. Sistem Administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1a73e8 0%, #34a853 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const loginContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px',
};

const logoContainerStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: '#1a73e8',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
};

const logoIconStyle = {
  fontSize: '32px',
  color: 'white',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#202124',
  margin: '0 0 8px 0',
};

const subtitleStyle = {
  fontSize: '14px',
  color: '#5f6368',
  margin: 0,
};

const formStyle = {
  marginBottom: '20px',
};

const errorStyle = {
  backgroundColor: '#fce8e6',
  color: '#d93025',
  padding: '12px',
  borderRadius: '4px',
  marginBottom: '20px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
};

const successStyle = {
  backgroundColor: '#e6f4ea',
  color: '#137333',
  padding: '12px',
  borderRadius: '4px',
  marginBottom: '20px',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
};

const inputGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#202124',
};

const inputContainerStyle = {
  position: 'relative',
};

const inputIconStyle = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#5f6368',
  fontSize: '16px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 12px 12px 40px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  boxSizing: 'border-box',
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const credentialsInfoStyle = {
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '4px',
  marginBottom: '20px',
};

const credentialsHeaderStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#202124',
  margin: '0 0 8px 0',
};

const credentialsTextStyle = {
  fontSize: '13px',
  color: '#5f6368',
  margin: 0,
  lineHeight: 1.5,
};

const footerStyle = {
  textAlign: 'center',
  paddingTop: '20px',
  borderTop: '1px solid #dadce0',
};

const footerTextStyle = {
  fontSize: '12px',
  color: '#5f6368',
  margin: 0,
};

export default AdminLogin;