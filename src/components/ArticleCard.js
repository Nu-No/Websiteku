import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ id, image, title, category, date, excerpt, author }) => {
  return (
    <div className="article-card" style={cardStyle}>
      <div className="article-image" style={imageContainerStyle}>
        <img src={image} alt={title} style={imageStyle} />
        <div className="article-category" style={categoryStyle}>
          {category}
        </div>
      </div>
      <div className="article-content" style={contentStyle}>
        <div className="article-meta" style={metaStyle}>
          <span style={dateStyle}>
            <i className="far fa-calendar-alt" style={iconStyle}></i> {date}
          </span>
          <span style={authorStyle}>
            <i className="far fa-user" style={iconStyle}></i> {author}
          </span>
        </div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={excerptStyle}>{excerpt}</p>
        <Link to={`/artikel/${id}`} style={readMoreStyle}>
          Baca Selengkapnya <i className="fas fa-arrow-right" style={{ marginLeft: '5px' }}></i>
        </Link>
      </div>
    </div>
  );
};

// Inline styles
const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const imageContainerStyle = {
  height: '200px',
  overflow: 'hidden',
  position: 'relative',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
};

const categoryStyle = {
  position: 'absolute',
  top: '15px',
  left: '15px',
  backgroundColor: '#1a73e8',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '4px',
  fontSize: '0.8rem',
  fontWeight: '500',
};

const contentStyle = {
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const metaStyle = {
  display: 'flex',
  marginBottom: '10px',
  fontSize: '0.9rem',
  color: '#5f6368',
};

const dateStyle = {
  marginRight: '15px',
  display: 'flex',
  alignItems: 'center',
};

const authorStyle = {
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  marginRight: '5px',
};

const titleStyle = {
  fontSize: '1.3rem',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#202124',
  lineHeight: 1.3,
};

const excerptStyle = {
  color: '#5f6368',
  marginBottom: '15px',
  flex: 1,
};

const readMoreStyle = {
  color: '#1a73e8',
  fontWeight: '500',
  display: 'inline-flex',
  alignItems: 'center',
  marginTop: 'auto',
  textDecoration: 'none',
};

export default ArticleCard;