import { useState, useRef, useCallback, useEffect, forwardRef } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const Widgets = forwardRef(function Widgets(props, ref) {
  return <div ref={ref} className={styles.widgetContainer}></div>
});

const TABS = [
  { svc: Callbridge.Service.None, label: 'Your App', },
  { svc: Callbridge.Service.Team, label: 'Team Chat', },
  { svc: Callbridge.Service.Drive, label: 'Drive', },
  { svc: Callbridge.Service.Contacts, label: 'Contacts', },
  { svc: Callbridge.Service.Meet, label: 'Meetings', },
];

const Tab = ({ setService, service, currentService, disabled, children }) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : () => setService(service)}
      disabled={disabled}
      className={currentService === service ? styles.active : undefined}
      style={{ position: 'relative' }}
    >
      {children}
    </button>
  );
};

const App = () => {
  useGuardedRoute(); // Guard the route
  const [isYourAppVisible, setIsYourAppVisible] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isWidgetInitialized, setWidgetInitialized] = useState(false);
  const [chatWidgetReady, setChatWidgetReady] = useState(false);
  const [service, setService] = useState(Callbridge.Service.None);
  const [redo, reloadService] = useState(false);

  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = useRef();
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const chatWidgetRef = useRef();
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const widgetRef = useRef();

  const credentials = useSelector(state => state.credentials);

  const renderWidget = useCallback((container, { domain, token, hostId }) => {
    console.log('Widget loading');

    const createWidget = () => {
      const widget = new Callbridge.Dashboard({
        domain,
        sso: {
          token,
          hostId,
        },
        container,
      });

      widget.on('room.READY', () => {
        console.log('Entered meeting');
      });

      widget.on('room.UNLOAD', () => {
        console.log('Left meeting: re-creating widget...');
        widgetRef.current?.unload();
        widgetRef.current = createWidget();
        widgetRef.current.on('dashboard.READY', () => {
          reloadService(f => !f);
        });
      });

      return widget;
    };

    widgetRef.current = createWidget();

    widgetRef.current.toggle(false);

    widgetRef.current.on('dashboard.READY', () => {
      setWidgetInitialized(true);

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

  useEffect(() => {
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
  }, [service, redo]);

  return (
    <div className={styles.appContainer}>
      <div className={styles.verticalTabContainer}>
        {
          TABS.map(({ svc, label }) => (
            <Tab
              key={svc}
              setService={setService}
              service={svc}
              currentService={service}
              disabled={!(svc === Callbridge.Service.Team ? chatWidgetReady : isWidgetInitialized)}
            >
              {label}
              {svc === Callbridge.Service.Team && <span className={styles.badge}>{unreadMessages}</span>}
            </Tab>
          ))
        }
      </div>
      {isYourAppVisible && <div>Your app goes here</div>}
      {!isWidgetInitialized && <div>The widgets are loading</div>}
      <TokenButton position='right' />
      <MenuButton position="right" />
      <Widgets ref={containerRef} />
    </div>
  );
}

export default App;
