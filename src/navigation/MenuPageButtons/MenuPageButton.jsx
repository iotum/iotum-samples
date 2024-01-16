import { useNavigate } from 'react-router-dom';

const MenuPageButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <button type="button" className="menu-button" onClick={() => navigate(path)}>{text}</button>
  );
}

export default MenuPageButton;
