import React from 'react';

const NotificationEmail = ({ recipient, message }) => {
  // Inline styles object
  const styles = {
    container: {
      background: 'rgba(255, 255, 255, 0.95)',
      maxWidth: '500px',
      margin: 'auto',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    logoSvg: {
      width: '200px',
      height: '200px',
    },
    greeting: {
      fontSize: '1.1rem',
      color: '#333',
      marginBottom: '20px',
      fontWeight: 500,
    },
    message: {
      color: '#444',
      fontSize: '1.1rem',
      lineHeight: 1.6,
      marginBottom: '30px',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '8px',
      border: '1px solid rgba(214, 28, 43, 0.1)',
    },
    footer: {
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#D61C2B',
      fontWeight: 600,
      borderTop: '2px solid rgba(214, 28, 43, 0.1)',
      paddingTop: '20px',
      marginTop: '30px',
    },
    responsiveContainer: {
      '@media (max-width: 600px)': {
        margin: '20px',
        padding: '30px',
      },
    },
    responsiveLogoSvg: {
      '@media (max-width: 600px)': {
        width: '150px',
        height: '150px',
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <svg viewBox="0 0 200 200" style={styles.logoSvg}>
          <circle cx="100" cy="100" r="95" fill="#f8f8f8" stroke="#D61C2B" strokeWidth="2" />
          <g transform="translate(30, 60) scale(0.7)">
            {/* Fork */}
            <path d="M20 0 Q25 40 25 80" stroke="#333" strokeWidth="6" fill="none" />
            <path d="M10 0 L20 0" stroke="#333" strokeWidth="6" fill="none" />
            <path d="M30 0 L20 0" stroke="#333" strokeWidth="6" fill="none" />
            
            {/* Crown */}
            <path
              d="M80 0 L140 0 L160 30 L130 30 L110 10 L90 30 L60 30 Z"
              fill="#D61C2B"
            />
            <circle cx="70" cy="15" r="3" fill="#333" />
            <circle cx="110" cy="15" r="3" fill="#333" />
            <circle cx="150" cy="15" r="3" fill="#333" />
            
            {/* Knife */}
            <path d="M200 0 Q195 40 195 80" stroke="#333" strokeWidth="6" fill="none" />
            <path d="M190 0 L200 0" stroke="#333" strokeWidth="6" fill="none" />
            <path d="M210 0 L200 0" stroke="#333" strokeWidth="6" fill="none" />
          </g>
          {/* Text */}
          <text
            x="100"
            y="130"
            textAnchor="middle"
            fontFamily="Arial Black"
            fontSize="24"
            fill="#333"
          >
            PRINCE
          </text>
          <text
            x="100"
            y="155"
            textAnchor="middle"
            fontFamily="Arial"
            fontSize="18"
            fill="#D61C2B"
          >
            FOOD
          </text>
          {/* Decorative elements */}
          <path d="M70 165 Q100 175 130 165" stroke="#333" strokeWidth="2" fill="none" />
          <circle cx="70" cy="165" r="2" fill="#D61C2B" />
          <circle cx="130" cy="165" r="2" fill="#D61C2B" />
        </svg>
      </div>
      
      <p style={styles.greeting}>Dear {recipient || '--'},</p>
      
      <div style={styles.message}>{message || '--'}</div>
      
      <p style={styles.footer}>&copy; Prince Food, 2024</p>
    </div>
  );
};

export default NotificationEmail;