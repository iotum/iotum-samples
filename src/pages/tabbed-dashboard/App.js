import React, { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const Widgets = forwardRef((props, ref) =>
  <div ref={ref} className={styles.widgetContainer}></div>
);

const App = () => {
  useGuardedRoute(); // Guard the route
  const [isYourAppVisible, setIsYourAppVisible] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isWidgetInitialized, setWidgetInitialized] = useState(false);
  const [chatWidgetReady, setChatWidgetReady] = useState(false);

  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = useRef();
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const chatWidgetRef = useRef();
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const widgetRef = useRef();

  const credentials = useSelector(state => state.credentials);

  const renderWidget = useCallback((container, { domain, token, hostId }) => {
    console.log('Widget loading');

    widgetRef.current = new Callbridge.Dashboard({
      domain,
      sso: {
        token,
        hostId,
      },
      container,
    });

    widgetRef.current.toggle(false);

    widgetRef.current.on('dashboard.READY', () => {
      chatWidgetRef.current = new Callbridge.Dashboard({
        domain,
        container,
      }, Callbridge.Service.Team);

      chatWidgetRef.current.toggle(false);

      chatWidgetRef.current.on('dashboard.UNREAD_MESSAGES', (data) => {
        const totalUnread = Object.values(data.rooms).reduce((total, count) => total + count, 0);
        setUnreadMessages(totalUnread);
      });

      chatWidgetRef.current.on('dashboard.READY', () => {
        setChatWidgetReady(true);
        setWidgetInitialized(true);
      });
    });
  }, []);

  useEffect(() => {
    // Check if all necessary credentials are available
    const areCredentialsValid = credentials.token && credentials.domain && credentials.hostId;
    if (areCredentialsValid && containerRef.current) {
      renderWidget(containerRef.current, credentials);

      return () => {
        widgetRef.current?.unload();
        chatWidgetRef.current?.unload();
        console.log('Widget unloaded');
      };
    }
  }, [credentials, renderWidget]);

  useEffect(() => {
    if (isWidgetInitialized) {
      chatWidgetRef.current.on('dashboard.NAVIGATE', (data) => {
        const room = data.pathname !== '/' ? data.pathname : "an unspecified room";
        console.log(`The chat widget navigated to this room: ${room}`);
      });
    }
  }, [isWidgetInitialized]);

  /**
   * @param {Callbridge.Service} service
   */
  const loadWidget = (service) => {
    widgetRef.current?.toggle(false);
    chatWidgetRef.current?.toggle(false);

    if (service === Callbridge.Service.None) {
      setIsYourAppVisible(true);
      console.log("Load your app");
    } else if (service === Callbridge.Service.Team) {
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
        <button type="button"
          onClick={() => loadWidget(Callbridge.Service.None)}
          disabled={!chatWidgetReady}
        >
          Your App
        </button>
        <button
          type="button"
          onClick={() => loadWidget('Team')}
          disabled={!chatWidgetReady}
          style={{ position: 'relative' }}
        >
          Team Chat
          {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
        </button>
        <button
          type="button"
          onClick={() => loadWidget(Callbridge.Service.Drive)}
          disabled={!chatWidgetReady}
        >
          Drive
        </button>
        <button
          type="button"
          onClick={() => loadWidget(Callbridge.Service.Contacts)}
          disabled={!chatWidgetReady}
        >
          Contacts
        </button>
        <button
          type="button"
          onClick={() => loadWidget(Callbridge.Service.Meet)}
          disabled={!chatWidgetReady}
        >
          Meetings
        </button>
      </div>
      {isYourAppVisible && <div>Your app goes here</div>}
      {!chatWidgetReady && <div>The widgets are loading</div>}
      <TokenButton position='right' />
      <MenuButton position="right" />
      <Widgets ref={containerRef} />
    </div>
  );
}

export default App;
