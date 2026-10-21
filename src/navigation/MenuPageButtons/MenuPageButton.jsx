import { useLocation } from 'wouter';

const MenuPageButton = ({ text, path }) => {
  const [, navigate] = useLocation();

  return (
    <button type="button" className="menu-button" onClick={() => navigate(path)}>{text}</button>
  );
}

export default MenuPageButton;
