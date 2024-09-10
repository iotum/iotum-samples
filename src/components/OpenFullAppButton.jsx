import MenuButtonStyles from '../navigation/MenuButton/MenuButton.module.css';

const OpenFullAppButton = ({ origin }) => {
  return (
    <div>
      <button
        type="button"
        className={MenuButtonStyles.menuButton}
        onClick={() => window.open(`${origin}/conf/conferences/create`, 'portal')}
      >
        open full app
      </button>
    </div>
  );
};

export default OpenFullAppButton;
