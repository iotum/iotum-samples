import { useLocation } from 'wouter';
import styles from './MenuButton.module.css'; 

function MenuButton({ position = 'left' }) { // 'left' is default if no position is provided
  const [, navigate] = useLocation();
  
  const handleClick = () => {
    console.log('Menu Button Clicked, Go To the Menu Page.');
    navigate('/menu');
  };

  // Determine the button position class
  const positionClass = position === 'right' ? styles.right : styles.left;

  return (
    <div>
      <button className={`${styles.menuButton} ${positionClass}`} onClick={handleClick}>
        Menu Page
      </button>
    </div>
  );
}

export default MenuButton;
