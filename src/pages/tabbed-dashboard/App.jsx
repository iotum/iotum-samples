import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import LoadingWidget from '../../components/LoadingWidget';
import OpenFullAppButton from '../../components/OpenFullAppButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';
import MenuButtonStyles from '../../navigation/MenuButton/MenuButton.module.css';

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

const HIDDEN_ELEMENT_IDS = [50, 51, 52, 53];

const HiddenAllElementsButton = ({ hideDashboardElements, setHideDashboardElements }) => {
  const onHideDashboardElementsClick = () => {
    // Contact our support team on how to see the list of hidable elements
    const selectedValues = hideDashboardElements ? undefined : HIDDEN_ELEMENT_IDS;
    setHideDashboardElements(selectedValues);
  }

  return (
    <div>
      <button
        type="button"
        className={`${MenuButtonStyles.menuButton} ${MenuButtonStyles.hideDashboardElementsButton}`}
        onClick={onHideDashboardElementsClick}
      >
        {`${hideDashboardElements ? 'Show' : 'Hide'} Dashboard Elements`}
      </button>
    </div>
  )
}

const MultiSelect = ({ hideDashboardElements, setHideDashboardElements }) => {
  const onMultiSelectChange = (event) => {
    const options = Array.from(event.target?.options);
    const selectedValues = options
      .filter(option => option.selected)
      .map(option => Number(option.value));

    setHideDashboardElements(selectedValues.length > 0 ? selectedValues : undefined);
  }

  return (
    <div>
      <select
        multiple
        onChange={onMultiSelectChange}
        value={hideDashboardElements || []}
        className={`${MenuButtonStyles.menuButton} ${MenuButtonStyles.multiSelectHideDashboardElements}`}
      >
        {HIDDEN_ELEMENT_IDS.map(value => (<option key={value} value={value}>{value}</option>))}
      </select>
    </div>
  );
};

const App = () => {
  useGuardedRoute(); // Guard the route

  const location = useLocation();

  const [error, setError] = useState('');
  const [isYourAppVisible, setIsYourAppVisible] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isWidgetInitialized, setWidgetInitialized] = useState(false);
  const [chatWidgetReady, setChatWidgetReady] = useState(false);
  const [service, setService] = useState(() => {
    const s = location.hash.slice(1);
    if (s in Callbridge.Service) {
      return Callbridge.Service[s];
    }
    return Callbridge.Service.None;
  });
  const [redo, reloadService] = useState(false);
  const [hideDashboardElements, setHideDashboardElements] = useState(undefined);

  /** @type {React.MutableRefObject<HTMLDivElement>} */
  const containerRef = useRef();
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const chatWidgetRef = useRef();
  /** @type {React.MutableRefObject<Callbridge.Dashboard>} */
  const widgetRef = useRef();

  const credentials = useSelector(state => state.credentials);

  const renderWidget = useCallback((container, { domain, token, hostId }, initService) => {
    console.log('Widget loading');

    const createWidget = (svc) => {
      const widget = new Callbridge.Dashboard({
        domain,
        sso: {
          token,
          hostId,
        },
        container,
      }, svc);

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

      widget.on('widget.ERROR', (error) => {
        console.error('Widget error:', error);
        setError(JSON.stringify(error));
      });

      return widget;
    };

    widgetRef.current = createWidget(initService);

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
      renderWidget(containerRef.current, credentials, service);

      return () => {
        widgetRef.current?.unload();
        chatWidgetRef.current?.unload();
        console.log('Widget unloaded');
      };
    }
    // initial service only
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    setIsYourAppVisible(service === Callbridge.Service.None);
    if (service === Callbridge.Service.None) {
      console.log("Load your app");
      window.history.pushState(null, '', '#');
      return;
    }
    
    if (service === Callbridge.Service.Team) {
      chatWidgetRef.current.toggle(true);
      console.log("Load the team chat widget");
    } else if (service === Callbridge.Service.Meet) {
      widgetRef.current.toggle(true);
      // Send in optional hiddenElements to hide the dashboard elements
      widgetRef.current.load(service, { hiddenElements: [] });
      console.log(`Load the Meet widget`);
    } else {
      widgetRef.current.toggle(true);
      widgetRef.current.load(service);
      console.log(`Load the ${service} widget`);
    }
    window.history.pushState(null, '', `#${Callbridge.Service[service]}`);
  }, [service, redo]);

  // Send the changed hidden elements to the SDK
  useEffect(() => {
    widgetRef.current?.setHiddenElements(hideDashboardElements);
  }, [hideDashboardElements]);

  const containerClassName = [
    styles.widgetContainer,
    service !== Callbridge.Service.None && styles.bordered
  ].filter(Boolean).join(' ');

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
        {!isWidgetInitialized && <LoadingWidget error={error} />}
      </div>
      {isYourAppVisible && (<div>Your app goes here</div>)}
      <TokenButton position='right' />
      <MenuButton position="right" />
      <div className={MenuButtonStyles.extraMenu}>
        {service === Callbridge.Service.Meet && <HiddenAllElementsButton hideDashboardElements={hideDashboardElements} setHideDashboardElements={setHideDashboardElements} />}
        {service === Callbridge.Service.Meet && <MultiSelect hideDashboardElements={hideDashboardElements} setHideDashboardElements={setHideDashboardElements} />}
        {widgetRef.current && <OpenFullAppButton {...credentials} />}
      </div>
      <div ref={containerRef} className={containerClassName}></div>
    </div>
  );
}

export default App;
