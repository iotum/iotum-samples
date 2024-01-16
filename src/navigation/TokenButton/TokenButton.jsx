import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TokenButton.module.css'; 

function TokenButton({ position = 'left' }) { // 'left' is default if no position is provided
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('Token Button Clicked, Go To the Token Page.');
    navigate('/iotum-samples');
  };

  // Determine the button position class
  const positionClass = position === 'right' ? styles.right : styles.left;

  return (
    <div>
      <button className={`${styles.tokenButton} ${positionClass}`} onClick={handleClick}>
        Token Page
      </button>
    </div>
  );
}

export default TokenButton;
