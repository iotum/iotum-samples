import { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import LoadingWidget from '../../components/LoadingWidget';
import * as Callbridge from '@iotum/callbridge-js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';
import { useCredentials } from '../../components/credentials';
import { handleStorageAccess, STORAGE_ACCESS_DENIED_MESSAGE } from '../../components/storageAccess';
import storageAccessStyles from '../../components/StorageAccess.module.css';

const App = () => {
  useGuardedRoute(); // Guard the route

  const [error, setError] = useState('');

  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [storageAccessHint, setStorageAccessHint] = useState('');
  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const hiddenContainerRef = useRef(null);
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const widget = useRef(null);

  const credentials = useCredentials();

  // Check if all necessary credentials are available
  const areCredentialsValid = credentials.token && credentials.domain && credentials.hostId;

  const renderChatWidget = (onReady) => {
    if (areCredentialsValid) {
      if (widget.current?.instance) {
        onReady();
      } else {
        const { domain, token, hostId } = credentials;
        widget.current = new Callbridge.Dashboard({
          domain,
          sso: { token, hostId },
          container: window,
          target: {
            name: "CallbridgeChatWidget",
            features: "width=800,height=600",
            checkExisting: true,
          }
        }, Callbridge.Service.Team);

        widget.current.on('dashboard.READY', onReady);
        widget.current.on('dashboard.NAVIGATE', (ev) => {
          console.log("navigate event:", ev.service, ev.pathname);
        });
      }
    }
  };

  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const onClick = (ev) => {
    ev.preventDefault();
    const { currentTarget: button } = ev;

    button.disabled = true;

    const timer = setTimeout(() => (button.disabled = false), 2e3);
    renderChatWidget(() => {
      clearTimeout(timer);
      button.disabled = false;
      widget.current.instance.focus();
    });
  };

  useEffect(() => {
    if (areCredentialsValid) {
      // The container is hidden with CSS. It stays in the DOM because moving an iframe reloads it,
      // and the widget must become visible when the user has to grant cookie access.
      const hiddenContainer = hiddenContainerRef.current;

      const { domain, token, hostId } = credentials;
      const invisibleWidget = new Callbridge.Dashboard({
        domain,
        sso: { token, hostId },
        container: hiddenContainer
      }, Callbridge.Service.Team);

      handleStorageAccess(invisibleWidget, {
        onRequired: setStorageAccessHint,
        onSettled: (denied) => {
          setStorageAccessHint('');
          if (denied) {
            setError(STORAGE_ACCESS_DENIED_MESSAGE);
          }
        },
      });

      invisibleWidget.on('dashboard.UNREAD_MESSAGES', (data) => {
        const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
        setUnreadMessages(sum);
        setIsLoading(false);
      });

      invisibleWidget.on('widget.ERROR', (error) => {
        console.error('Widget error:', error);
        setError(JSON.stringify(error));
      });

      return () => {
        widget.current?.unload();
        invisibleWidget?.unload();
      };
    }
  }, [areCredentialsValid, credentials]);

  return (
    <>
      <TokenButton position='right' />
      <MenuButton position="right" />
      <div className={styles.chatContainer}>
        {isLoading ? (
          <LoadingWidget error={error}>Loading unread messages</LoadingWidget>
        ) : (
          <>
            <button type="button" className={styles.biggerButton} onClick={onClick}>
              Chat
            </button>
            <span className={styles.badge}>{unreadMessages}</span>
          </>
        )}
      </div>
      <div className={storageAccessHint ? storageAccessStyles.modal : storageAccessStyles.hidden}>
        {storageAccessHint && <div>{storageAccessHint}</div>}
        <div ref={hiddenContainerRef} />
      </div>
    </>
  );
};

export default App;
