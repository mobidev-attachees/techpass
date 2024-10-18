import React, { useState, useEffect } from 'react';
import styles from './Spinner.module.css'; // Assuming you're using CSS modules

const Spinner = () => {
  const text = 'TECHPASS';
  const letters = text.split('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Track the current letter index

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the current letter index on each spin
      setCurrentLetterIndex((prevIndex) =>
        prevIndex === letters.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500); // Match the timing with the spin duration (1.5s)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [letters.length]);

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loader}>
        <div className={styles.textContainer}>
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`${styles.letter} ${
                index === currentLetterIndex ? styles.visible : styles.hidden
              }`}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spinner;
