import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const App = () => {
  useGuardedRoute(); // Guard the route
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const widget = useRef(null);

  const credentials = useSelector(state => state.credentials);

  // Check if all necessary credentials are available
  const areCredentialsValid = credentials.token && credentials.domain && credentials.hostId;

  const renderChatWidget = (onReady) => {
    if (areCredentialsValid) {
      if (widget.current?.instance) {
        widget.current.instance.focus();
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
        widget.current.on('dashboard.NAVIGATE', (data) => {
          console.log("navigate event");
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
    });
  };

  useEffect(() => {
    if (areCredentialsValid) {
      // The container is not in DOM
      const hiddenContainer = document.createElement('div');

      const { domain, token, hostId } = credentials;
      const invisibleWidget = new Callbridge.Dashboard({
        domain,
        sso: { token, hostId },
        container: hiddenContainer
      }, Callbridge.Service.Team);

      invisibleWidget.on('dashboard.UNREAD_MESSAGES', (data) => {
        const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
        setUnreadMessages(sum);
        setIsLoading(false);
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
          <div>Loading unread messages...</div>
        ) : (
          <>
            <button type="button" className={styles.biggerButton} onClick={onClick}>
              Chat
            </button>
            <span className={styles.badge}>{unreadMessages}</span>
          </>
        )}
      </div>
    </>
  );
};

export default App;
