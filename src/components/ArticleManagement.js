import React, { useState } from 'react';

const ArticleManagement = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Tips Menjaga Kesehatan Jantung',
      excerpt: 'Pelajari cara-cara sederhana untuk menjaga kesehatan jantung Anda setiap hari.',
      content: 'Kesehatan jantung adalah hal yang sangat penting untuk dijaga. Berikut adalah beberapa tips yang dapat membantu Anda menjaga kesehatan jantung...',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Andi Wijaya',
      category: 'Kesehatan Jantung',
      publishDate: '2024-01-15',
      status: 'published',
      views: 1250,
      tags: ['jantung', 'kesehatan', 'tips']
    },
    {
      id: 2,
      title: 'Pentingnya Vaksinasi untuk Anak',
      excerpt: 'Mengapa vaksinasi sangat penting untuk melindungi anak-anak dari berbagai penyakit.',
      content: 'Vaksinasi adalah salah satu cara terbaik untuk melindungi anak-anak dari penyakit serius...',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Siti Rahmah',
      category: 'Kesehatan Anak',
      publishDate: '2024-01-10',
      status: 'published',
      views: 890,
      tags: ['vaksinasi', 'anak', 'imunisasi']
    },
    {
      id: 3,
      title: 'Mengatasi Stress di Era Digital',
      excerpt: 'Cara-cara efektif untuk mengelola stress dalam kehidupan modern yang serba digital.',
      content: 'Di era digital ini, stress menjadi masalah yang semakin umum...',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Budi Santoso',
      category: 'Kesehatan Mental',
      publishDate: '2024-01-08',
      status: 'draft',
      views: 0,
      tags: ['stress', 'mental', 'digital']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    category: '',
    publishDate: '',
    status: 'draft',
    tags: ''
  });

  const categories = [
    'Kesehatan Umum',
    'Kesehatan Jantung',
    'Kesehatan Anak',
    'Kesehatan Mental',
    'Nutrisi',
    'Olahraga',
    'Pencegahan Penyakit',
    'Lainnya'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      if (value === 'Lainnya') {
        setShowCustomCategory(true);
        setFormData(prev => ({
          ...prev,
          [name]: ''
        }));
      } else {
        setShowCustomCategory(false);
        setCustomCategory('');
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCustomCategoryChange = (e) => {
    const value = e.target.value;
    setCustomCategory(value);
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      views: editingArticle ? editingArticle.views : 0
    };

    if (editingArticle) {
      // Update existing article
      setArticles(prev => prev.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...articleData }
          : article
      ));
    } else {
      // Add new article
      const newArticle = {
        id: Date.now(),
        ...articleData
      };
      setArticles(prev => [...prev, newArticle]);
    }
    
    resetForm();
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    
    // Check if category is custom (not in predefined categories)
    const isCustomCategory = !categories.slice(0, -1).includes(article.category); // exclude "Lainnya"
    
    if (isCustomCategory) {
      setShowCustomCategory(true);
      setCustomCategory(article.category);
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        author: article.author,
        category: article.category,
        publishDate: article.publishDate,
        status: article.status,
        tags: article.tags.join(', ')
      });
    } else {
      setShowCustomCategory(false);
      setCustomCategory('');
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        author: article.author,
        category: article.category,
        publishDate: article.publishDate,
        status: article.status,
        tags: article.tags.join(', ')
      });
    }
    
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setArticles(prev => prev.map(article => 
      article.id === id 
        ? { 
            ...article, 
            status: article.status === 'published' ? 'draft' : 'published',
            publishDate: article.status === 'draft' ? new Date().toISOString().split('T')[0] : article.publishDate
          }
        : article
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '',
      author: '',
      category: '',
      publishDate: '',
      status: 'draft',
      tags: ''
    });
    setEditingArticle(null);
    setShowModal(false);
    setShowCustomCategory(false);
    setCustomCategory('');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="article-management" style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Manajemen Artikel</h2>
        <button 
          onClick={() => setShowModal(true)}
          style={addButtonStyle}
        >
          <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
          Tambah Artikel
        </button>
      </div>

      <div style={articlesGridStyle}>
        {articles.map(article => (
          <div key={article.id} style={articleCardStyle}>
            <div style={articleImageContainerStyle}>
              <img 
                src={article.image} 
                alt={article.title}
                style={articleImageStyle}
              />
              <div style={articleStatusBadgeStyle}>
                <span style={{
                  ...statusBadgeStyle,
                  backgroundColor: article.status === 'published' ? '#34a853' : '#f9ab00',
                  color: 'white'
                }}>
                  {article.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            <div style={articleContentStyle}>
              <div style={articleMetaStyle}>
                <span style={categoryStyle}>{article.category}</span>
                <span style={dateStyle}>{formatDate(article.publishDate)}</span>
              </div>

              <h3 style={articleTitleStyle}>{article.title}</h3>
              <p style={articleExcerptStyle}>{article.excerpt}</p>

              <div style={articleInfoStyle}>
                <div style={authorInfoStyle}>
                  <i className="fas fa-user" style={infoIconStyle}></i>
                  <span>{article.author}</span>
                </div>
                <div style={viewsInfoStyle}>
                  <i className="fas fa-eye" style={infoIconStyle}></i>
                  <span>{article.views} views</span>
                </div>
              </div>

              <div style={tagsContainerStyle}>
                {article.tags.map(tag => (
                  <span key={tag} style={tagStyle}>#{tag}</span>
                ))}
              </div>

              <div style={articleActionsStyle}>
                <button 
                  onClick={() => toggleStatus(article.id)}
                  style={{
                    ...statusButtonStyle,
                    backgroundColor: article.status === 'published' ? '#ea4335' : '#34a853'
                  }}
                  title={article.status === 'published' ? 'Unpublish' : 'Publish'}
                >
                  <i className={article.status === 'published' ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </button>
                <button 
                  onClick={() => handleEdit(article)}
                  style={editButtonStyle}
                  title="Edit"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(article.id)}
                  style={deleteButtonStyle}
                  title="Hapus"
                >
                  <i className="fas fa-trash"></i>
                </button>
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
                {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
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
                <label style={labelStyle}>Judul Artikel</label>
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
                <label style={labelStyle}>Ringkasan</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  style={{...inputStyle, height: '60px', resize: 'vertical'}}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Konten Artikel</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  style={{...inputStyle, height: '120px', resize: 'vertical'}}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>URL Gambar</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Penulis</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Kategori</label>
                  <select
                    name="category"
                    value={showCustomCategory ? 'Lainnya' : formData.category}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  {showCustomCategory && (
                    <div style={{ marginTop: '8px' }}>
                      <input
                        type="text"
                        value={customCategory}
                        onChange={handleCustomCategoryChange}
                        style={{
                          ...inputStyle,
                          borderColor: '#1a73e8',
                          backgroundColor: '#f8f9ff'
                        }}
                        placeholder="Masukkan kategori baru..."
                        required
                      />
                      <small style={helpTextStyle}>
                        <i className="fas fa-info-circle" style={{ marginRight: '4px' }}></i>
                        Kategori baru akan ditambahkan ke daftar
                      </small>
                    </div>
                  )}
                </div>
              </div>

              <div style={inputRowStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Tanggal Publikasi</label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    style={inputStyle}
                    required
                  />
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Tags (pisahkan dengan koma)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="kesehatan, tips, jantung"
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
                  {editingArticle ? 'Update' : 'Simpan'}
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

const articlesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
  gap: '20px',
};

const articleCardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};

const articleImageContainerStyle = {
  position: 'relative',
  height: '200px',
  overflow: 'hidden',
};

const articleImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const articleStatusBadgeStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
};

const statusBadgeStyle = {
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: '500',
};

const articleContentStyle = {
  padding: '15px',
};

const articleMetaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const categoryStyle = {
  fontSize: '12px',
  color: '#1a73e8',
  fontWeight: '500',
  textTransform: 'uppercase',
};

const dateStyle = {
  fontSize: '12px',
  color: '#5f6368',
};

const articleTitleStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#202124',
  marginBottom: '8px',
  lineHeight: '1.3',
};

const articleExcerptStyle = {
  fontSize: '14px',
  color: '#5f6368',
  lineHeight: '1.4',
  marginBottom: '15px',
};

const articleInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const authorInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  color: '#5f6368',
};

const viewsInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '12px',
  color: '#5f6368',
};

const infoIconStyle = {
  fontSize: '10px',
};

const tagsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
  marginBottom: '15px',
};

const tagStyle = {
  fontSize: '11px',
  color: '#1a73e8',
  backgroundColor: '#e8f0fe',
  padding: '2px 6px',
  borderRadius: '10px',
};

const articleActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
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
  maxWidth: '600px',
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

const helpTextStyle = {
  display: 'block',
  marginTop: '4px',
  fontSize: '12px',
  color: '#1a73e8',
  fontStyle: 'italic'
};

export default ArticleManagement;