import React, { useState } from 'react';

const TelemedicineChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    nik: '',
    namaLengkap: '',
    nomorTelepon: ''
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      message: 'Selamat datang di layanan Telemedicine MedCare! Silakan isi form registrasi terlebih dahulu.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (formData.nik && formData.namaLengkap && formData.nomorTelepon) {
      setIsRegistered(true);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'system',
        message: `Halo ${formData.namaLengkap}! Registrasi berhasil. Anda sekarang dapat memulai konsultasi dengan dokter kami.`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setNewMessage('');
      
      // Simulasi respons dokter
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: 'doctor',
          message: 'Terima kasih atas pertanyaan Anda. Dokter akan segera merespons. Mohon tunggu sebentar.',
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="telemedicine-chat" style={containerStyle}>
      {/* Floating Button */}
      <button 
        className="chat-toggle-btn" 
        onClick={toggleChat}
        style={floatingButtonStyle}
      >
        {isOpen ? (
          <i className="fas fa-times" style={iconStyle}></i>
        ) : (
          <i className="fas fa-comments" style={iconStyle}></i>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window" style={chatWindowStyle}>
          {/* Header */}
          <div className="chat-header" style={chatHeaderStyle}>
            <div style={headerContentStyle}>
              <i className="fas fa-user-md" style={headerIconStyle}></i>
              <div>
                <h4 style={headerTitleStyle}>Telemedicine</h4>
                <p style={headerSubtitleStyle}>Konsultasi Online dengan Dokter</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="chat-content" style={chatContentStyle}>
            {!isRegistered ? (
              /* Registration Form */
              <div className="registration-form" style={registrationFormStyle}>
                <h5 style={formTitleStyle}>Registrasi Pasien</h5>
                <p style={formDescriptionStyle}>
                  Silakan isi data diri Anda untuk memulai konsultasi
                </p>
                
                <form onSubmit={handleRegistration}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>NIK</label>
                    <input
                      type="text"
                      name="nik"
                      value={formData.nik}
                      onChange={handleInputChange}
                      placeholder="Masukkan NIK Anda"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Nama Lengkap</label>
                    <input
                      type="text"
                      name="namaLengkap"
                      value={formData.namaLengkap}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Nomor Telepon</label>
                    <input
                      type="tel"
                      name="nomorTelepon"
                      value={formData.nomorTelepon}
                      onChange={handleInputChange}
                      placeholder="Masukkan nomor telepon"
                      style={inputStyle}
                      required
                    />
                  </div>

                  <button type="submit" style={submitButtonStyle}>
                    <i className="fas fa-play" style={{ marginRight: '8px' }}></i>
                    Mulai Obrolan
                  </button>
                </form>
              </div>
            ) : (
              /* Chat Interface */
              <div className="chat-interface">
                {/* Messages */}
                <div className="messages" style={messagesStyle}>
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender}`}
                      style={{
                        ...messageStyle,
                        ...(message.sender === 'user' ? userMessageStyle : 
                           message.sender === 'doctor' ? doctorMessageStyle : systemMessageStyle)
                      }}
                    >
                      <div style={messageContentStyle}>
                        {message.sender === 'doctor' && (
                          <div style={doctorLabelStyle}>
                            <i className="fas fa-user-md" style={{ marginRight: '5px' }}></i>
                            Dokter
                          </div>
                        )}
                        <p style={messageTextStyle}>{message.message}</p>
                        <span style={timestampStyle}>{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} style={messageFormStyle}>
                  <div style={messageInputContainerStyle}>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ketik pesan Anda..."
                      style={messageInputStyle}
                    />
                    <button type="submit" style={sendButtonStyle}>
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
};

const floatingButtonStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#1a73e8',
  border: 'none',
  boxShadow: '0 4px 20px rgba(26, 115, 232, 0.3)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  animation: 'pulse 2s infinite',
};

const iconStyle = {
  color: 'white',
  fontSize: '24px',
};

const chatWindowStyle = {
  position: 'absolute',
  bottom: '80px',
  right: '0',
  width: '350px',
  height: '500px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const chatHeaderStyle = {
  backgroundColor: '#1a73e8',
  color: 'white',
  padding: '15px',
};

const headerContentStyle = {
  display: 'flex',
  alignItems: 'center',
};

const headerIconStyle = {
  fontSize: '24px',
  marginRight: '12px',
};

const headerTitleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '600',
};

const headerSubtitleStyle = {
  margin: 0,
  fontSize: '12px',
  opacity: 0.9,
};

const chatContentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const registrationFormStyle = {
  padding: '20px',
  flex: 1,
};

const formTitleStyle = {
  margin: '0 0 8px 0',
  fontSize: '18px',
  fontWeight: '600',
  color: '#202124',
};

const formDescriptionStyle = {
  margin: '0 0 20px 0',
  fontSize: '14px',
  color: '#5f6368',
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
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const messagesStyle = {
  flex: 1,
  padding: '15px',
  overflowY: 'auto',
  maxHeight: '350px',
};

const messageStyle = {
  marginBottom: '15px',
};

const userMessageStyle = {
  textAlign: 'right',
};

const doctorMessageStyle = {
  textAlign: 'left',
};

const systemMessageStyle = {
  textAlign: 'center',
};

const messageContentStyle = {
  display: 'inline-block',
  maxWidth: '80%',
};

const doctorLabelStyle = {
  fontSize: '12px',
  color: '#34a853',
  fontWeight: '500',
  marginBottom: '4px',
};

const messageTextStyle = {
  margin: 0,
  padding: '8px 12px',
  borderRadius: '12px',
  fontSize: '14px',
  backgroundColor: '#f1f3f4',
  color: '#202124',
};

const timestampStyle = {
  fontSize: '11px',
  color: '#5f6368',
  marginTop: '4px',
  display: 'block',
};

const messageFormStyle = {
  padding: '15px',
  borderTop: '1px solid #dadce0',
};

const messageInputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const messageInputStyle = {
  flex: 1,
  padding: '8px 12px',
  border: '1px solid #dadce0',
  borderRadius: '20px',
  fontSize: '14px',
  outline: 'none',
};

const sendButtonStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#1a73e8',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default TelemedicineChat;