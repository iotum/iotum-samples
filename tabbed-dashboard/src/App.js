import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [yourApp, setYourApp] = useState(true);
  const [unreadMessages, setUnreadMessages] = useState();
  const [start, setStart] = useState();
  const [chatWidgetReady, setChatWidgetReady] = useState(false); // New state
  const [domain, setDomain] = useState('iotum.callbridge.rocks'); //default domain

  const container = useRef(null);
  const chatWidget = useRef(null);
  const widget = useRef(null);

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const renderWidget = () => {
  console.log("Two widgets were rendered: A chat room widget and a widget for the drive/contacts");
  console.log("Both these widgets start as invisible");

  widget.current = new Callbridge.Dashboard(
    {
      domain: domain, // using the state variable for domain
      sso: {
        token: token,
        hostId: hostId,
    },
      container: container.current,
    }, 
  );
    widget.current.toggle(false);


    widget.current.on('dashboard.READY', () => {
      console.log("render chat widget");
      chatWidget.current = new Callbridge.Dashboard(
        {
          domain: 'iotum.callbridge.rocks',
          container: container.current,
        },
        "Team",
      );
        chatWidget.current.toggle(false);
    
      chatWidget.current.on('dashboard.UNREAD_MESSAGES', (data) => {
        console.log("There was an unread messages event")
        const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
        setUnreadMessages(sum);
      });

      chatWidget.current.on('dashboard.READY', () => {
        console.log("Chat widget is ready");
        setChatWidgetReady(true); // Set chatWidgetReady to true when chat widget is ready
        setStart(true);
      });
    }); 
}

  useEffect(() => {
    if (start === true) {
      chatWidget.current.on('dashboard.NAVIGATE', (data) => {
        if (data.pathname !== '/') {
          loadWidget('Team');
          console.log("The chat widget navigated to this room: " + data.pathname);
        } else {
          console.log("The chat widget navigated to an unspecified room");
        }
      });
    }
  }, [start]);

  useEffect(() => {
    if (submitted) {
      renderWidget();
    }
  }, [submitted]);

  const loadWidget = (service) => {
    if(service === "") {
      widget.current.toggle(false);
      chatWidget.current.toggle(false);
      chatWidget.current.load("Team", {layout: "full", pathname: "/"})
      chatWidget.current.toggle(false);
      setYourApp(true);
      console.log("Load your app")
    }
    else if (service === "Team") {
      chatWidget.current.toggle(true);
      widget.current.toggle(false);  
      setYourApp(false); 
      console.log("Load the team chat widget")
    }  else {
      widget.current.toggle(true); 
      widget.current.load(service);
      chatWidget.current.toggle(false);
      chatWidget.current.load("Team", {layout: "full", pathname: "/"})
      chatWidget.current.toggle(false);
      console.log("Load the " + service +  " widget")
      setYourApp(false); 
    }
  }

  if (submitted) {
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
        {yourApp && <div>Your app goes here</div>}
        {!chatWidgetReady && <div>The widgets are loading</div>}

        <div ref={container} className={styles.widgetContainer}></div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'}}>Tabbed Dashboard App</div>
      <form onSubmit={handleSubmit}>
        <label>
          Domain:
          <input type="text" value={domain} onChange={handleDomainChange} required/>
        </label>
        <br />
        <label>
          SSO Token:
          <input type="text" value={token} onChange={handleTokenChange} required/>
        </label>
        <br />
        <label>
          Host ID:
          <input type="text" value={hostId} onChange={handleHostIdChange} required/>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
