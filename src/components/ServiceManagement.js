import React, { useState } from 'react';

const ServiceManagement = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      icon: 'fas fa-user-md',
      title: 'Konsultasi Dokter',
      description: 'Konsultasi dengan dokter berpengalaman untuk berbagai keluhan kesehatan Anda.',
      price: 'Rp 150.000',
      duration: '30 menit',
      available: true
    },
    {
      id: 2,
      icon: 'fas fa-pills',
      title: 'Resep Obat',
      description: 'Dapatkan resep obat digital yang dapat ditebus di apotek terdekat.',
      price: 'Rp 25.000',
      duration: '15 menit',
      available: true
    },
    {
      id: 3,
      icon: 'fas fa-heartbeat',
      title: 'Pemeriksaan Jantung',
      description: 'Pemeriksaan kesehatan jantung dengan teknologi modern dan akurat.',
      price: 'Rp 500.000',
      duration: '60 menit',
      available: true
    },
    {
      id: 4,
      icon: 'fas fa-x-ray',
      title: 'Rontgen Digital',
      description: 'Layanan rontgen digital dengan hasil yang cepat dan akurat.',
      price: 'Rp 300.000',
      duration: '45 menit',
      available: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
    price: '',
    duration: '',
    available: true
  });

  const iconOptions = [
    'fas fa-user-md',
    'fas fa-pills',
    'fas fa-heartbeat',
    'fas fa-x-ray',
    'fas fa-stethoscope',
    'fas fa-syringe',
    'fas fa-microscope',
    'fas fa-tooth',
    'fas fa-eye',
    'fas fa-brain'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingService) {
      // Update existing service
      setServices(prev => prev.map(service => 
        service.id === editingService.id 
          ? { ...service, ...formData }
          : service
      ));
    } else {
      // Add new service
      const newService = {
        id: Date.now(),
        ...formData
      };
      setServices(prev => [...prev, newService]);
    }
    
    resetForm();
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      available: service.available
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus layanan ini?')) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setServices(prev => prev.map(service => 
      service.id === id 
        ? { ...service, available: !service.available }
        : service
    ));
  };

  const resetForm = () => {
    setFormData({
      icon: '',
      title: '',
      description: '',
      price: '',
      duration: '',
      available: true
    });
    setEditingService(null);
    setShowModal(false);
  };

  return (
    <div className="service-management" style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Manajemen Layanan</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={addButtonStyle}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Tambah Layanan
        </button>
      </div>

      <div style={servicesGridStyle}>
        {services.map(service => (
          <div key={service.id} style={serviceCardStyle}>
            <div style={serviceHeaderStyle}>
              <div style={serviceIconStyle}>
                <i className={service.icon} style={{ fontSize: '24px', color: '#1a73e8' }}></i>
              </div>
              <div style={serviceActionsStyle}>
                <button 
                  onClick={() => toggleAvailability(service.id)}
                  style={{
                    ...statusButtonStyle,
                    backgroundColor: service.available ? '#34a853' : '#ea4335'
                  }}
                  title={service.available ? 'Nonaktifkan' : 'Aktifkan'}
                >
                  <i className={service.available ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i>
                </button>
                <button 
                  onClick={() => handleEdit(service)}
                  style={editButtonStyle}
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(service.id)}
                  style={deleteButtonStyle}
                  title="Hapus"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div style={serviceContentStyle}>
              <h3 style={serviceTitleStyle}>{service.title}</h3>
              <p style={serviceDescriptionStyle}>{service.description}</p>
              
              <div style={serviceDetailsStyle}>
                <div style={serviceDetailItemStyle}>
                  <i className="fas fa-money-bill-wave" style={detailIconStyle}></i>
                  <span>{service.price}</span>
                </div>
                <div style={serviceDetailItemStyle}>
                  <i className="fas fa-clock" style={detailIconStyle}></i>
                  <span>{service.duration}</span>
                </div>
              </div>

              <div style={serviceStatusStyle}>
                <span style={{
                  ...statusBadgeStyle,
                  backgroundColor: service.available ? '#e8f5e8' : '#fce8e6',
                  color: service.available ? '#137333' : '#d93025'
                }}>
                  {service.available ? 'Tersedia' : 'Tidak Tersedia'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                {editingService ? 'Edit Layanan' : 'Tambah Layanan Baru'}
              </h3>
              <button 
                onClick={resetForm}
                style={closeButtonStyle}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Icon</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value="">Pilih Icon</option>
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>
                      {icon.replace('fas fa-', '').replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Nama Layanan</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{...inputStyle, height: '80px', resize: 'vertical'}}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Harga</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Rp 150.000"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Durasi</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="30 menit"
                  required
                />
              </div>

              <div style={checkboxGroupStyle}>
                <label style={checkboxLabelStyle}>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    style={checkboxStyle}
                  />
                  Layanan Tersedia
                </label>
              </div>

              <div style={modalActionsStyle}>
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={cancelButtonStyle}
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  style={saveButtonStyle}
                >
                  {editingService ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '20px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#202124',
  margin: 0,
};

const addButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
};

const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '20px',
};

const serviceCardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};

const serviceHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  borderBottom: '1px solid #dadce0',
};

const serviceIconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const serviceActionsStyle = {
  display: 'flex',
  gap: '8px',
};

const statusButtonStyle = {
  padding: '8px',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
};

const editButtonStyle = {
  padding: '8px',
  backgroundColor: '#34a853',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
};

const deleteButtonStyle = {
  padding: '8px',
  backgroundColor: '#ea4335',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
};

const serviceContentStyle = {
  padding: '15px',
};

const serviceTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
  marginBottom: '8px',
};

const serviceDescriptionStyle = {
  fontSize: '14px',
  color: '#5f6368',
  lineHeight: '1.5',
  marginBottom: '15px',
};

const serviceDetailsStyle = {
  display: 'flex',
  gap: '15px',
  marginBottom: '15px',
};

const serviceDetailItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '14px',
  color: '#202124',
};

const detailIconStyle = {
  color: '#1a73e8',
  fontSize: '12px',
};

const serviceStatusStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const statusBadgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflow: 'auto',
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #dadce0',
};

const modalTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
  margin: 0,
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#5f6368',
};

const formStyle = {
  padding: '20px',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#202124',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const checkboxGroupStyle = {
  marginBottom: '15px',
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  color: '#202124',
  cursor: 'pointer',
};

const checkboxStyle = {
  marginRight: '8px',
};

const modalActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px',
};

const cancelButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#f8f9fa',
  color: '#5f6368',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  cursor: 'pointer',
};

const saveButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ServiceManagement;