// src/app/components/Spinner.jsx

import React from 'react';

const Spinner = () => {
  const text = 'TechPass'; // Text to display in the spinner
  const letters = text.split(''); // Split the text into individual letters

  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.loader}>
        <div style={styles.textContainer}>
          {letters.map((letter, index) => (
            <span
              key={index}
              style={{ 
                ...styles.letter, 
                animationDelay: `${index * 0.3}s` 
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loader: {
    position: 'relative',
    border: '8px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '8px solid blue',
    width: '120px',
    height: '120px',
    animation: 'spin 2s linear infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    display: 'flex',
  },
  letter: {
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black',
    opacity: 0,
    animation: 'pulse 2.1s ease-in-out infinite',
  },
};

// Adding keyframe animations
const stylesWithKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0% { opacity: 0; transform: scale(1); }
    10% { opacity: 1; transform: scale(1.5); }
    30% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; }
  }
`;

// Injecting keyframe styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = stylesWithKeyframes;
  document.head.appendChild(styleSheet);
}

export default Spinner;
