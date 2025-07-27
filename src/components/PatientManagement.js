import React, { useState } from 'react';

const PatientManagement = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      nik: '3201234567890123',
      fullName: 'Ahmad Rizki Pratama',
      phone: '081234567890',
      email: 'ahmad.rizki@email.com',
      birthDate: '1990-05-15',
      gender: 'Laki-laki',
      address: 'Jl. Merdeka No. 123, Jakarta Pusat',
      bloodType: 'A+',
      emergencyContact: '081987654321',
      registrationDate: '2024-01-10',
      lastVisit: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      nik: '3201234567890124',
      fullName: 'Siti Nurhaliza',
      phone: '081234567891',
      email: 'siti.nurhaliza@email.com',
      birthDate: '1985-08-22',
      gender: 'Perempuan',
      address: 'Jl. Sudirman No. 456, Jakarta Selatan',
      bloodType: 'B+',
      emergencyContact: '081987654322',
      registrationDate: '2024-01-08',
      lastVisit: '2024-01-18',
      status: 'active'
    },
    {
      id: 3,
      nik: '3201234567890125',
      fullName: 'Budi Santoso',
      phone: '081234567892',
      email: 'budi.santoso@email.com',
      birthDate: '1978-12-03',
      gender: 'Laki-laki',
      address: 'Jl. Thamrin No. 789, Jakarta Pusat',
      bloodType: 'O-',
      emergencyContact: '081987654323',
      registrationDate: '2024-01-05',
      lastVisit: '2024-01-15',
      status: 'inactive'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [formData, setFormData] = useState({
    nik: '',
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
    address: '',
    bloodType: '',
    emergencyContact: '',
    status: 'active'
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const patientData = {
      ...formData,
      registrationDate: editingPatient ? editingPatient.registrationDate : new Date().toISOString().split('T')[0],
      lastVisit: editingPatient ? editingPatient.lastVisit : new Date().toISOString().split('T')[0]
    };

    if (editingPatient) {
      // Update existing patient
      setPatients(prev => prev.map(patient => 
        patient.id === editingPatient.id 
          ? { ...patient, ...patientData }
          : patient
      ));
    } else {
      // Add new patient
      const newPatient = {
        id: Date.now(),
        ...patientData
      };
      setPatients(prev => [...prev, newPatient]);
    }
    
    resetForm();
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData({
      nik: patient.nik,
      fullName: patient.fullName,
      phone: patient.phone,
      email: patient.email,
      birthDate: patient.birthDate,
      gender: patient.gender,
      address: patient.address,
      bloodType: patient.bloodType,
      emergencyContact: patient.emergencyContact,
      status: patient.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
      setPatients(prev => prev.filter(patient => patient.id !== id));
    }
  };

  const handleViewDetail = (patient) => {
    setSelectedPatient(patient);
    setShowDetailModal(true);
  };

  const toggleStatus = (id) => {
    setPatients(prev => prev.map(patient => 
      patient.id === id 
        ? { ...patient, status: patient.status === 'active' ? 'inactive' : 'active' }
        : patient
    ));
  };

  const resetForm = () => {
    setFormData({
      nik: '',
      fullName: '',
      phone: '',
      email: '',
      birthDate: '',
      gender: '',
      address: '',
      bloodType: '',
      emergencyContact: '',
      status: 'active'
    });
    setEditingPatient(null);
    setShowModal(false);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="patient-management" style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Manajemen Pasien</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={addButtonStyle}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Tambah Pasien
        </button>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={thStyle}>NIK</th>
              <th style={thStyle}>Nama Lengkap</th>
              <th style={thStyle}>Kontak</th>
              <th style={thStyle}>Umur</th>
              <th style={thStyle}>Golongan Darah</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Kunjungan Terakhir</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id} style={tableRowStyle}>
                <td style={tdStyle}>{patient.nik}</td>
                <td style={tdStyle}>
                  <div style={patientNameStyle}>
                    <div style={nameStyle}>{patient.fullName}</div>
                    <div style={genderStyle}>{patient.gender}</div>
                  </div>
                </td>
                <td style={tdStyle}>
                  <div style={contactStyle}>
                    <div>{patient.phone}</div>
                    <div style={emailStyle}>{patient.email}</div>
                  </div>
                </td>
                <td style={tdStyle}>{calculateAge(patient.birthDate)} tahun</td>
                <td style={tdStyle}>
                  <span style={bloodTypeStyle}>{patient.bloodType}</span>
                </td>
                <td style={tdStyle}>
                  <span style={{
                    ...statusBadgeStyle,
                    backgroundColor: patient.status === 'active' ? '#e8f5e8' : '#fce8e6',
                    color: patient.status === 'active' ? '#137333' : '#d93025'
                  }}>
                    {patient.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </td>
                <td style={tdStyle}>{formatDate(patient.lastVisit)}</td>
                <td style={tdStyle}>
                  <div style={actionButtonsStyle}>
                    <button 
                      onClick={() => handleViewDetail(patient)}
                      style={viewButtonStyle}
                      title="Lihat Detail"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      onClick={() => toggleStatus(patient.id)}
                      style={{
                        ...statusButtonStyle,
                        backgroundColor: patient.status === 'active' ? '#f9ab00' : '#34a853'
                      }}
                      title={patient.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                    >
                      <i className={patient.status === 'active' ? 'fas fa-pause' : 'fas fa-play'}></i>
                    </button>
                    <button 
                      onClick={() => handleEdit(patient)}
                      style={editButtonStyle}
                      title="Edit"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(patient.id)}
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                {editingPatient ? 'Edit Data Pasien' : 'Tambah Pasien Baru'}
              </h3>
              <button 
                onClick={resetForm}
                style={closeButtonStyle}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>NIK</label>
                  <input
                    type="text"
                    name="nik"
                    value={formData.nik}
                    onChange={handleInputChange}
                    style={inputStyle}
                    maxLength="16"
                    required
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={inputRowStyle}>
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
              </div>

              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Tanggal Lahir</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Alamat</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{...inputStyle, height: '60px', resize: 'vertical'}}
                  required
                />
              </div>

              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Golongan Darah</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Pilih Golongan Darah</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Kontak Darurat</label>
                  <input
                    type="tel"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
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
                  {editingPatient ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPatient && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>Detail Pasien</h3>
              <button 
                onClick={() => setShowDetailModal(false)}
                style={closeButtonStyle}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div style={detailContentStyle}>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>NIK:</div>
                <div style={detailValueStyle}>{selectedPatient.nik}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Nama Lengkap:</div>
                <div style={detailValueStyle}>{selectedPatient.fullName}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Jenis Kelamin:</div>
                <div style={detailValueStyle}>{selectedPatient.gender}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Tanggal Lahir:</div>
                <div style={detailValueStyle}>{formatDate(selectedPatient.birthDate)} ({calculateAge(selectedPatient.birthDate)} tahun)</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Nomor Telepon:</div>
                <div style={detailValueStyle}>{selectedPatient.phone}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Email:</div>
                <div style={detailValueStyle}>{selectedPatient.email}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Alamat:</div>
                <div style={detailValueStyle}>{selectedPatient.address}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Golongan Darah:</div>
                <div style={detailValueStyle}>
                  <span style={bloodTypeStyle}>{selectedPatient.bloodType}</span>
                </div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Kontak Darurat:</div>
                <div style={detailValueStyle}>{selectedPatient.emergencyContact}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Tanggal Registrasi:</div>
                <div style={detailValueStyle}>{formatDate(selectedPatient.registrationDate)}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Kunjungan Terakhir:</div>
                <div style={detailValueStyle}>{formatDate(selectedPatient.lastVisit)}</div>
              </div>
              <div style={detailRowStyle}>
                <div style={detailLabelStyle}>Status:</div>
                <div style={detailValueStyle}>
                  <span style={{
                    ...statusBadgeStyle,
                    backgroundColor: selectedPatient.status === 'active' ? '#e8f5e8' : '#fce8e6',
                    color: selectedPatient.status === 'active' ? '#137333' : '#d93025'
                  }}>
                    {selectedPatient.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </div>
              </div>
            </div>
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
  overflow: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '1000px',
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
  whiteSpace: 'nowrap',
};

const tableRowStyle = {
  borderBottom: '1px solid #dadce0',
};

const tdStyle = {
  padding: '15px',
  verticalAlign: 'middle',
};

const patientNameStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const nameStyle = {
  fontWeight: '500',
  color: '#202124',
};

const genderStyle = {
  fontSize: '12px',
  color: '#5f6368',
};

const contactStyle = {
  fontSize: '14px',
};

const emailStyle = {
  color: '#5f6368',
  fontSize: '12px',
};

const bloodTypeStyle = {
  backgroundColor: '#e8f0fe',
  color: '#1a73e8',
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500',
};

const statusBadgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500',
};

const actionButtonsStyle = {
  display: 'flex',
  gap: '8px',
};

const viewButtonStyle = {
  padding: '8px',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
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
  maxWidth: '700px',
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
  flex: 1,
};

const inputRowStyle = {
  display: 'flex',
  gap: '15px',
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

const detailContentStyle = {
  padding: '20px',
};

const detailRowStyle = {
  display: 'flex',
  marginBottom: '15px',
  alignItems: 'flex-start',
};

const detailLabelStyle = {
  fontWeight: '600',
  color: '#202124',
  minWidth: '150px',
  fontSize: '14px',
};

const detailValueStyle = {
  color: '#5f6368',
  fontSize: '14px',
  flex: 1,
};

export default PatientManagement;