import React, { useState, useEffect } from 'react';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Andi Wijaya',
      specialty: 'Dokter Umum',
      rating: 4.8,
      experience: 10,
      phone: '081234567890',
      email: 'andi.wijaya@medcare.com'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Siti Rahmah',
      specialty: 'Dokter Anak',
      rating: 4.9,
      experience: 12,
      phone: '081234567891',
      email: 'siti.rahmah@medcare.com'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
      name: 'Dr. Budi Santoso',
      specialty: 'Dokter Jantung',
      rating: 4.7,
      experience: 15,
      phone: '081234567892',
      email: 'budi.santoso@medcare.com'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    phone: '',
    email: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingDoctor) {
      // Update existing doctor
      setDoctors(prev => prev.map(doctor => 
        doctor.id === editingDoctor.id 
          ? { ...doctor, ...formData, rating: doctor.rating }
          : doctor
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        id: Date.now(),
        ...formData,
        rating: 4.5,
        experience: parseInt(formData.experience)
      };
      setDoctors(prev => [...prev, newDoctor]);
    }
    
    resetForm();
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      experience: doctor.experience.toString(),
      phone: doctor.phone,
      email: doctor.email,
      image: doctor.image
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
      setDoctors(prev => prev.filter(doctor => doctor.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      specialty: '',
      experience: '',
      phone: '',
      email: '',
      image: ''
    });
    setEditingDoctor(null);
    setShowModal(false);
  };

  return (
    <div className="doctor-management" style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Manajemen Dokter</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={addButtonStyle}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Tambah Dokter
        </button>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={thStyle}>Foto</th>
              <th style={thStyle}>Nama</th>
              <th style={thStyle}>Spesialisasi</th>
              <th style={thStyle}>Pengalaman</th>
              <th style={thStyle}>Rating</th>
              <th style={thStyle}>Kontak</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor => (
              <tr key={doctor.id} style={tableRowStyle}>
                <td style={tdStyle}>
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    style={doctorImageStyle}
                  />
                </td>
                <td style={tdStyle}>{doctor.name}</td>
                <td style={tdStyle}>{doctor.specialty}</td>
                <td style={tdStyle}>{doctor.experience} tahun</td>
                <td style={tdStyle}>
                  <span style={ratingStyle}>
                    <i className="fas fa-star" style={{ color: '#f4b400' }}></i>
                    {doctor.rating}
                  </span>
                </td>
                <td style={tdStyle}>
                  <div style={contactStyle}>
                    <div>{doctor.phone}</div>
                    <div style={emailStyle}>{doctor.email}</div>
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={actionButtonsStyle}>
                    <button 
                      onClick={() => handleEdit(doctor)}
                      style={editButtonStyle}
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(doctor.id)}
                      style={deleteButtonStyle}
                      title="Hapus"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                {editingDoctor ? 'Edit Dokter' : 'Tambah Dokter Baru'}
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
                <label style={labelStyle}>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Spesialisasi</label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Dokter Umum">Dokter Umum</option>
                  <option value="Dokter Anak">Dokter Anak</option>
                  <option value="Dokter Jantung">Dokter Jantung</option>
                  <option value="Dokter Kulit">Dokter Kulit</option>
                  <option value="Dokter Mata">Dokter Mata</option>
                  <option value="Dokter Gigi">Dokter Gigi</option>
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Pengalaman (tahun)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  style={inputStyle}
                  min="1"
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>URL Foto</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="https://example.com/photo.jpg"
                  required
                />
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
                  {editingDoctor ? 'Update' : 'Simpan'}
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

const tableContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const tableHeaderStyle = {
  backgroundColor: '#f8f9fa',
};

const thStyle = {
  padding: '15px',
  textAlign: 'left',
  fontWeight: '600',
  color: '#202124',
  borderBottom: '1px solid #dadce0',
};

const tableRowStyle = {
  borderBottom: '1px solid #dadce0',
};

const tdStyle = {
  padding: '15px',
  verticalAlign: 'middle',
};

const doctorImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  objectFit: 'cover',
};

const ratingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

const contactStyle = {
  fontSize: '14px',
};

const emailStyle = {
  color: '#5f6368',
  fontSize: '12px',
};

const actionButtonsStyle = {
  display: 'flex',
  gap: '8px',
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

export default DoctorManagement;