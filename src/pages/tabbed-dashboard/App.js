import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const App = () => {
  useGuardedRoute(); // Guard the route
  const [isYourAppVisible, setIsYourAppVisible] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isWidgetInitialized, setIsWidgetInitialized] = useState(false);
  const [chatWidgetReady, setChatWidgetReady] = useState(false);

  const containerRef = useRef(null);
  const chatWidgetRef = useRef(null);
  const widgetRef = useRef(null);

  const credentials = useSelector(state => state.credentials);

  // Check if all necessary credentials are available
  const areCredentialsValid = credentials.token && credentials.domain && credentials.hostId;

  const unloadWidgets = () => {
    if (widgetRef.current) {
      widgetRef.current.toggle(false);
    }
    if (chatWidgetRef.current) {
      chatWidgetRef.current.toggle(false);
    }
  };

  const renderWidget = useCallback(() => {
    if (areCredentialsValid) {
      widgetRef.current = new Callbridge.Dashboard({
        domain: credentials.domain,
        sso: {
          token: credentials.token,
          hostId: credentials.hostId,
        },
        container: containerRef.current,
      });

      widgetRef.current.toggle(false);

      widgetRef.current.on('dashboard.READY', () => {
        chatWidgetRef.current = new Callbridge.Dashboard({
          domain: credentials.domain,
          container: containerRef.current,
        }, Callbridge.Service.Team);

        chatWidgetRef.current.toggle(false);

        chatWidgetRef.current.on('dashboard.UNREAD_MESSAGES', (data) => {
          const totalUnread = Object.values(data.rooms).reduce((total, count) => total + count, 0);
          setUnreadMessages(totalUnread);
        });

        chatWidgetRef.current.on('dashboard.READY', () => {
          setChatWidgetReady(true);
          setIsWidgetInitialized(true);
        });
      });
    }
  }, [credentials, areCredentialsValid]);

  useEffect(() => {
    if (areCredentialsValid) {
      renderWidget();
    }

    return () => {
      unloadWidgets();
      console.log('Widget unloaded');
    };
  }, [credentials, renderWidget, areCredentialsValid]);

  useEffect(() => {
    if (isWidgetInitialized) {
      chatWidgetRef.current.on('dashboard.NAVIGATE', (data) => {
        const room = data.pathname !== '/' ? data.pathname : "an unspecified room";
        console.log(`The chat widget navigated to this room: ${room}`);
      });
    }
  }, [isWidgetInitialized]);

  const loadWidget = (service) => {
    unloadWidgets(); // Unload any currently displayed widgets

    if (service === "") {
      setIsYourAppVisible(true);
      console.log("Load your app");
    } else if (service === "Team") {
      chatWidgetRef.current.toggle(true);
      setIsYourAppVisible(false);
      console.log("Load the team chat widget");
    } else {
      widgetRef.current.toggle(true);
      widgetRef.current.load(service);
      setIsYourAppVisible(false);
      console.log(`Load the ${service} widget`);
    }
  }

  return (
    <div className={styles.appContainer}>
      <div className={styles.verticalTabContainer}>
        <button onClick={() => loadWidget('')} disabled={!chatWidgetReady}>
          Your App
        </button>
        <button
          onClick={() => loadWidget('Team')}
          disabled={!chatWidgetReady}
          style={{ position: 'relative' }}
        >
          Team Chat
          {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
        </button>
        <button onClick={() => loadWidget('Drive')} disabled={!chatWidgetReady}>
          Drive
        </button>
        <button onClick={() => loadWidget('Contacts')} disabled={!chatWidgetReady}>
          Contacts
        </button>
      </div>
      {isYourAppVisible && <div>Your app goes here</div>}
      {!chatWidgetReady && <div>The widgets are loading</div>}
      <div ref={containerRef} className={styles.widgetContainer}></div>
      <TokenButton position='right' />
      <MenuButton position="right" />
    </div>
  );
}

export default App;
