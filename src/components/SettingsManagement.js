import React, { useState } from 'react';

const SettingsManagement = () => {
  const [settings, setSettings] = useState({
    siteName: 'MedCare',
    siteDescription: 'Layanan Kesehatan Terpercaya',
    contactEmail: 'info@medcare.com',
    contactPhone: '+62 21 1234 5678',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    workingHours: '08:00 - 20:00',
    emergencyNumber: '+62 21 9999 8888',
    socialMedia: {
      facebook: 'https://facebook.com/medcare',
      twitter: 'https://twitter.com/medcare',
      instagram: 'https://instagram.com/medcare',
      youtube: 'https://youtube.com/medcare'
    },
    features: {
      onlineBooking: true,
      telemedicine: true,
      emergencyService: true,
      homeVisit: false
    },
    theme: {
      primaryColor: '#1a73e8',
      secondaryColor: '#34a853',
      accentColor: '#fbbc04'
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveMessage('');
    
    // Simulasi penyimpanan
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Pengaturan berhasil disimpan!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'Umum', icon: 'fas fa-cog' },
    { id: 'contact', label: 'Kontak', icon: 'fas fa-phone' },
    { id: 'social', label: 'Media Sosial', icon: 'fas fa-share-alt' },
    { id: 'features', label: 'Fitur', icon: 'fas fa-puzzle-piece' },
    { id: 'theme', label: 'Tema', icon: 'fas fa-palette' }
  ];

  const renderGeneralSettings = () => (
    <div style={tabContentStyle}>
      <h3 style={sectionTitleStyle}>Pengaturan Umum</h3>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Nama Website</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleDirectChange('siteName', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Deskripsi Website</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => handleDirectChange('siteDescription', e.target.value)}
          style={textareaStyle}
          rows="3"
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Jam Operasional</label>
        <input
          type="text"
          value={settings.workingHours}
          onChange={(e) => handleDirectChange('workingHours', e.target.value)}
          style={inputStyle}
          placeholder="08:00 - 20:00"
        />
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div style={tabContentStyle}>
      <h3 style={sectionTitleStyle}>Informasi Kontak</h3>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={settings.contactEmail}
          onChange={(e) => handleDirectChange('contactEmail', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Nomor Telepon</label>
        <input
          type="text"
          value={settings.contactPhone}
          onChange={(e) => handleDirectChange('contactPhone', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Alamat</label>
        <textarea
          value={settings.address}
          onChange={(e) => handleDirectChange('address', e.target.value)}
          style={textareaStyle}
          rows="3"
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Nomor Darurat</label>
        <input
          type="text"
          value={settings.emergencyNumber}
          onChange={(e) => handleDirectChange('emergencyNumber', e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div style={tabContentStyle}>
      <h3 style={sectionTitleStyle}>Media Sosial</h3>
      
      <div style={formGroupStyle}>
        <label style={labelStyle}>Facebook</label>
        <input
          type="url"
          value={settings.socialMedia.facebook}
          onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Twitter</label>
        <input
          type="url"
          value={settings.socialMedia.twitter}
          onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Instagram</label>
        <input
          type="url"
          value={settings.socialMedia.instagram}
          onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>YouTube</label>
        <input
          type="url"
          value={settings.socialMedia.youtube}
          onChange={(e) => handleInputChange('socialMedia', 'youtube', e.target.value)}
          style={inputStyle}
        />
      </div>
    </div>
  );

  const renderFeatureSettings = () => (
    <div style={tabContentStyle}>
      <h3 style={sectionTitleStyle}>Pengaturan Fitur</h3>
      
      <div style={featureItemStyle}>
        <div>
          <h4 style={featureTitleStyle}>Booking Online</h4>
          <p style={featureDescStyle}>Memungkinkan pasien membuat janji temu online</p>
        </div>
        <label style={switchStyle}>
          <input
            type="checkbox"
            checked={settings.features.onlineBooking}
            onChange={(e) => handleInputChange('features', 'onlineBooking', e.target.checked)}
            style={checkboxStyle}
          />
          <span style={sliderStyle}></span>
        </label>
      </div>

      <div style={featureItemStyle}>
        <div>
          <h4 style={featureTitleStyle}>Telemedicine</h4>
          <p style={featureDescStyle}>Layanan konsultasi online dengan dokter</p>
        </div>
        <label style={switchStyle}>
          <input
            type="checkbox"
            checked={settings.features.telemedicine}
            onChange={(e) => handleInputChange('features', 'telemedicine', e.target.checked)}
            style={checkboxStyle}
          />
          <span style={sliderStyle}></span>
        </label>
      </div>

      <div style={featureItemStyle}>
        <div>
          <h4 style={featureTitleStyle}>Layanan Darurat</h4>
          <p style={featureDescStyle}>Layanan darurat 24/7</p>
        </div>
        <label style={switchStyle}>
          <input
            type="checkbox"
            checked={settings.features.emergencyService}
            onChange={(e) => handleInputChange('features', 'emergencyService', e.target.checked)}
            style={checkboxStyle}
          />
          <span style={sliderStyle}></span>
        </label>
      </div>

      <div style={featureItemStyle}>
        <div>
          <h4 style={featureTitleStyle}>Kunjungan Rumah</h4>
          <p style={featureDescStyle}>Layanan dokter ke rumah pasien</p>
        </div>
        <label style={switchStyle}>
          <input
            type="checkbox"
            checked={settings.features.homeVisit}
            onChange={(e) => handleInputChange('features', 'homeVisit', e.target.checked)}
            style={checkboxStyle}
          />
          <span style={sliderStyle}></span>
        </label>
      </div>
    </div>
  );

  const renderThemeSettings = () => (
    <div style={tabContentStyle}>
      <h3 style={sectionTitleStyle}>Pengaturan Tema</h3>
      
      <div style={colorGroupStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Warna Primer</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={settings.theme.primaryColor}
              onChange={(e) => handleInputChange('theme', 'primaryColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={settings.theme.primaryColor}
              onChange={(e) => handleInputChange('theme', 'primaryColor', e.target.value)}
              style={colorTextStyle}
            />
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Warna Sekunder</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={settings.theme.secondaryColor}
              onChange={(e) => handleInputChange('theme', 'secondaryColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={settings.theme.secondaryColor}
              onChange={(e) => handleInputChange('theme', 'secondaryColor', e.target.value)}
              style={colorTextStyle}
            />
          </div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Warna Aksen</label>
          <div style={colorInputContainerStyle}>
            <input
              type="color"
              value={settings.theme.accentColor}
              onChange={(e) => handleInputChange('theme', 'accentColor', e.target.value)}
              style={colorInputStyle}
            />
            <input
              type="text"
              value={settings.theme.accentColor}
              onChange={(e) => handleInputChange('theme', 'accentColor', e.target.value)}
              style={colorTextStyle}
            />
          </div>
        </div>
      </div>

      <div style={previewStyle}>
        <h4 style={previewTitleStyle}>Preview Warna</h4>
        <div style={colorPreviewStyle}>
          <div style={{
            ...colorSampleStyle,
            backgroundColor: settings.theme.primaryColor
          }}>
            Primer
          </div>
          <div style={{
            ...colorSampleStyle,
            backgroundColor: settings.theme.secondaryColor
          }}>
            Sekunder
          </div>
          <div style={{
            ...colorSampleStyle,
            backgroundColor: settings.theme.accentColor
          }}>
            Aksen
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'contact': return renderContactSettings();
      case 'social': return renderSocialSettings();
      case 'features': return renderFeatureSettings();
      case 'theme': return renderThemeSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Pengaturan Website</h2>
        <div style={headerActionsStyle}>
          {saveMessage && (
            <span style={saveMessageStyle}>
              <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i>
              {saveMessage}
            </span>
          )}
          <button 
            style={{
              ...saveButtonStyle,
              opacity: isSaving ? 0.7 : 1,
              cursor: isSaving ? 'not-allowed' : 'pointer'
            }}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                Menyimpan...
              </>
            ) : (
              <>
                <i className="fas fa-save" style={{ marginRight: '8px' }}></i>
                Simpan Pengaturan
              </>
            )}
          </button>
        </div>
      </div>

      <div style={contentStyle}>
        <div style={tabsStyle}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              style={{
                ...tabButtonStyle,
                backgroundColor: activeTab === tab.id ? '#1a73e8' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#5f6368'
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon} style={{ marginRight: '8px' }}></i>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={tabContentContainerStyle}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#202124',
  margin: 0
};

const headerActionsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

const saveMessageStyle = {
  color: '#137333',
  fontSize: '14px',
  fontWeight: '500'
};

const saveButtonStyle = {
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center'
};

const contentStyle = {
  display: 'flex',
  gap: '20px'
};

const tabsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  minWidth: '200px'
};

const tabButtonStyle = {
  padding: '12px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.2s ease'
};

const tabContentContainerStyle = {
  flex: 1,
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const tabContentStyle = {
  padding: '20px'
};

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
  marginBottom: '20px'
};

const formGroupStyle = {
  marginBottom: '20px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#202124'
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  padding: '10px 12px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px',
  resize: 'vertical',
  boxSizing: 'border-box'
};

const featureItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 0',
  borderBottom: '1px solid #e0e0e0'
};

const featureTitleStyle = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#202124',
  margin: '0 0 4px 0'
};

const featureDescStyle = {
  fontSize: '14px',
  color: '#5f6368',
  margin: 0
};

const switchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '24px'
};

const checkboxStyle = {
  opacity: 0,
  width: 0,
  height: 0
};

const sliderStyle = {
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#ccc',
  transition: '0.4s',
  borderRadius: '24px'
};

const colorGroupStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '30px'
};

const colorInputContainerStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

const colorInputStyle = {
  width: '50px',
  height: '40px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  cursor: 'pointer'
};

const colorTextStyle = {
  flex: 1,
  padding: '10px 12px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px'
};

const previewStyle = {
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px'
};

const previewTitleStyle = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#202124',
  marginBottom: '15px'
};

const colorPreviewStyle = {
  display: 'flex',
  gap: '10px'
};

const colorSampleStyle = {
  padding: '10px 15px',
  borderRadius: '4px',
  color: 'white',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'center',
  minWidth: '80px'
};

export default SettingsManagement;