import React, { useState, useEffect } from 'react';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    type: 'consultation',
    status: 'scheduled',
    notes: ''
  });

  // Data dummy untuk demo
  useEffect(() => {
    const dummyAppointments = [
      {
        id: 1,
        patientName: 'John Doe',
        doctorName: 'Dr. Sarah Wilson',
        date: '2024-01-15',
        time: '09:00',
        type: 'consultation',
        status: 'scheduled',
        notes: 'Pemeriksaan rutin'
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        doctorName: 'Dr. Michael Brown',
        date: '2024-01-16',
        time: '14:30',
        type: 'follow-up',
        status: 'completed',
        notes: 'Kontrol setelah operasi'
      }
    ];
    setAppointments(dummyAppointments);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAppointment) {
      // Update appointment
      setAppointments(prev => prev.map(appointment => 
        appointment.id === editingAppointment.id 
          ? { ...formData, id: editingAppointment.id }
          : appointment
      ));
    } else {
      // Add new appointment
      const newAppointment = {
        ...formData,
        id: Date.now()
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      doctorName: '',
      date: '',
      time: '',
      type: 'consultation',
      status: 'scheduled',
      notes: ''
    });
    setEditingAppointment(null);
    setShowModal(false);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData(appointment);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus appointment ini?')) {
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#1a73e8';
      case 'completed': return '#34a853';
      case 'cancelled': return '#ea4335';
      case 'no-show': return '#ff9800';
      default: return '#5f6368';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Terjadwal';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      case 'no-show': return 'Tidak Hadir';
      default: return status;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Manajemen Appointment</h2>
        <button 
          style={addButtonStyle}
          onClick={() => setShowModal(true)}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Tambah Appointment
        </button>
      </div>

      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={tableHeaderStyle}>
              <th style={thStyle}>Pasien</th>
              <th style={thStyle}>Dokter</th>
              <th style={thStyle}>Tanggal</th>
              <th style={thStyle}>Waktu</th>
              <th style={thStyle}>Tipe</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id} style={tableRowStyle}>
                <td style={tdStyle}>{appointment.patientName}</td>
                <td style={tdStyle}>{appointment.doctorName}</td>
                <td style={tdStyle}>{appointment.date}</td>
                <td style={tdStyle}>{appointment.time}</td>
                <td style={tdStyle}>
                  <span style={{
                    ...badgeStyle,
                    backgroundColor: appointment.type === 'consultation' ? '#e3f2fd' : '#f3e5f5',
                    color: appointment.type === 'consultation' ? '#1976d2' : '#7b1fa2'
                  }}>
                    {appointment.type === 'consultation' ? 'Konsultasi' : 'Follow-up'}
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{
                    ...statusBadgeStyle,
                    backgroundColor: getStatusColor(appointment.status),
                  }}>
                    {getStatusText(appointment.status)}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button 
                    style={editButtonStyle}
                    onClick={() => handleEdit(appointment)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(appointment.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                {editingAppointment ? 'Edit Appointment' : 'Tambah Appointment Baru'}
              </h3>
              <button 
                style={closeButtonStyle}
                onClick={resetForm}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={formRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Nama Pasien</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Nama Dokter</label>
                  <input
                    type="text"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={formRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Tanggal</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Waktu</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div style={formRowStyle}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Tipe Appointment</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="consultation">Konsultasi</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="scheduled">Terjadwal</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                    <option value="no-show">Tidak Hadir</option>
                  </select>
                </div>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Catatan</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  style={textareaStyle}
                  rows="3"
                />
              </div>

              <div style={modalFooterStyle}>
                <button 
                  type="button" 
                  style={cancelButtonStyle}
                  onClick={resetForm}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  style={submitButtonStyle}
                >
                  {editingAppointment ? 'Update' : 'Simpan'}
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

const addButtonStyle = {
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

const tableContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const tableHeaderStyle = {
  backgroundColor: '#f8f9fa'
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: '600',
  color: '#5f6368',
  borderBottom: '1px solid #e0e0e0'
};

const tableRowStyle = {
  borderBottom: '1px solid #e0e0e0'
};

const tdStyle = {
  padding: '12px',
  color: '#202124'
};

const badgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500'
};

const statusBadgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500',
  color: 'white'
};

const editButtonStyle = {
  backgroundColor: '#34a853',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '8px',
  fontSize: '12px'
};

const deleteButtonStyle = {
  backgroundColor: '#ea4335',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
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
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflow: 'auto'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #e0e0e0'
};

const modalTitleStyle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
  margin: 0
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#5f6368'
};

const formStyle = {
  padding: '20px'
};

const formRowStyle = {
  display: 'flex',
  gap: '15px',
  marginBottom: '15px'
};

const formGroupStyle = {
  flex: 1
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#202124'
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box'
};

const textareaStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  fontSize: '14px',
  resize: 'vertical',
  boxSizing: 'border-box'
};

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  marginTop: '20px'
};

const cancelButtonStyle = {
  backgroundColor: '#f8f9fa',
  color: '#5f6368',
  border: '1px solid #dadce0',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

const submitButtonStyle = {
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500'
};

export default AppointmentManagement;