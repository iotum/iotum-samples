import React, { useState, useRef, useCallback, useEffect } from 'react';
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
  const widget = useRef(null);

  const credentials = useSelector(state => state.credentials);

  // Check if all necessary credentials are available
  const areCredentialsValid = credentials.token && credentials.domain && credentials.hostId;

  const renderChatWidget = useCallback(() => {
    if (areCredentialsValid) {
      if (!widget.current || !widget.current.instance) {
        widget.current = new Callbridge.Dashboard({
          domain: credentials.domain,
          sso: {
            token: credentials.token,
            hostId: credentials.hostId,
          },
          container: window,
          target: {
            name: "CallbridgeChatWidget",
            checkExisting: true,
          }
        }, Callbridge.Service.Team);

        widget.current.on('dashboard.NAVIGATE', (data) => {
          console.log("navigate event");
        });
      } else if (widget.current.instance) {
        widget.current.instance.focus();
      }
    }
  }, [credentials, areCredentialsValid]);

  useEffect(() => {
    if (areCredentialsValid) {
      const hiddenContainer = document.createElement('div');
      hiddenContainer.style.display = 'none';
      document.body.appendChild(hiddenContainer);

      const invisibleWidget = new Callbridge.Dashboard({
        domain: credentials.domain,
        sso: {
          token: credentials.token,
          hostId: credentials.hostId,
        },
        container: hiddenContainer,
        target: {
          name: "InvisibleWidget",
          checkExisting: true,
        }
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
  }, [credentials, areCredentialsValid]);

  return (
    <>
      <TokenButton position='right' />
      <MenuButton position="right" />
      <div className={styles.chatContainer}>
        {isLoading ? (
          <div>Loading unread messages...</div>
        ) : (
          <>
            <button className={styles.biggerButton} onClick={renderChatWidget}>
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
