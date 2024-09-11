import MenuButtonStyles from '../navigation/MenuButton/MenuButton.module.css';

const OpenFullAppButton = ({ domain, token, hostId }) => {
  if (!domain || !token || !hostId) {
    return null;
  }

  const url = new URL('/auth', `https://${domain}`);
  url.searchParams.append('host_id', String(hostId));
  url.searchParams.append('login_token_public_key', token);
  url.searchParams.append('redirect_url', encodeURI('/conf/conferences/create?events=false'));

  return (
    <div>
      <button
        type="button"
        className={MenuButtonStyles.menuButton}
        onClick={() => window.open(url.href, 'portal', 'noreferrer')}
      >
        open full app
      </button>
    </div>
  );
};

export default OpenFullAppButton;
