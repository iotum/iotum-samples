import { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import LoadingWidget from '../../components/LoadingWidget';
import * as Callbridge from '@iotum/callbridge-js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';
import MenuButtonStyles from '../../navigation/MenuButton/MenuButton.module.css';
import { useCredentials } from '../../components/credentials';
import { handleStorageAccess, STORAGE_ACCESS_DENIED_MESSAGE } from '../../components/storageAccess';
import storageAccessStyles from '../../components/StorageAccess.module.css';

// `Service.Calls` was added in iotum/callbridge-js#37; fall back to its value for older SDK releases.
const CALLS = Callbridge.Service.Calls ?? 'Calls';

const App = () => {
  useGuardedRoute(); // Guard the route

  const [error, setError] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [storageAccessHint, setStorageAccessHint] = useState('');

  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = useRef(null);
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const widgetRef = useRef(null);

  const credentials = useCredentials();

  useEffect(() => {
    const { domain, token, hostId } = credentials;
    if (!domain || !token || !hostId || !containerRef.current) {
      return;
    }

    // With an SDK release that includes `Service.Calls`, this can be shortened to:
    //   new Callbridge.Dashboard(options, Callbridge.Service.Calls);
    const widget = new Callbridge.Dashboard({
      domain,
      sso: { token, hostId },
      container: containerRef.current,
    });
    widgetRef.current = widget;

    widget.once('dashboard.READY', () => {
      widget.load(CALLS);
      setIsReady(true);
    });

    widget.on('dashboard.NAVIGATE', ({ service, pathname }) => {
      console.log('Calls widget navigated:', service, pathname);
    });

    widget.on('dashboard.SESSION_EXPIRED', () => {
      console.error('Widget error:', 'Session expired');
      setError('Session expired');
    });

    widget.on('widget.ERROR', (error) => {
      console.error('Widget error:', error);
      setError(JSON.stringify(error));
    });

    handleStorageAccess(widget, {
      onRequired: setStorageAccessHint,
      onSettled: (denied) => {
        setStorageAccessHint('');
        if (denied) {
          setError(STORAGE_ACCESS_DENIED_MESSAGE);
        }
      },
    });

    return () => {
      widget.unload();
      widgetRef.current = null;
      console.log('Widget unloaded');
    };
  }, [credentials]);

  const containerClassName = [
    styles.widgetContainer,
    storageAccessHint && storageAccessStyles.prompt,
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.appContainer}>
      <LoadingWidget error={error} isLoading={!isReady || Boolean(storageAccessHint)}>
        {storageAccessHint || undefined}
      </LoadingWidget>
      <TokenButton position="right" />
      <MenuButton position="right" />
      <div className={MenuButtonStyles.extraMenu}>
        {isReady && (
          <button
            type="button"
            className={MenuButtonStyles.menuButton}
            onClick={() => widgetRef.current?.load(CALLS)}
          >
            Reload Calls
          </button>
        )}
      </div>
      <div ref={containerRef} className={containerClassName}></div>
    </div>
  );
};

export default App;
