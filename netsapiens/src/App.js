import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';


function App() {
const [token, setToken] = useState('');
const [hostId, setHostId] = useState('');
const [submitted, setSubmitted] = useState(false);
const [yourApp, setYourApp] = useState(true); 
const [unreadMessages, setUnreadMessages] = useState();

// Create a reference for the widget container
const container = useRef(null);
// Store a reference to the current widget instance
const widgetRef = useRef(null);

const handleTokenChange = (event) => {
  setToken(event.target.value);
};

const handleHostIdChange = (event) => {
  setHostId(event.target.value);
};

// const getUnreadMessages = () => {
//   const container = document.createElement('div');
//   container.style.display = 'none';
//   const invisibleWidget = new Callbridge.Dashboard(
//     {
//       domain: 'iotum.callbridge.rocks',
//       sso: {
//         token: token,
//         hostId: hostId,
//       },
//       container: container,
//     },
//     "Team",
//   );
//   //this widget listens for the number of unread messages 
//   invisibleWidget.on('dashboard.UNREAD_MESSAGES', (data) => {
//     const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
//     setUnreadMessages(sum);
//   });
// }


const handleSubmit = () => {
  // getUnreadMessages();
  setSubmitted(true);
};

const renderWidget = () => {
  widgetRef.current = new Callbridge.Dashboard(
    {
      domain: 'iotum.callbridge.rocks',
      sso: {
        token: token,
        hostId: hostId,
    },
      container: container.current,
    }, 
    "Team",
  );
    widgetRef.current.toggle(false);

    widgetRef.current.on('dashboard.UNREAD_MESSAGES', (data) => {
        const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
        setUnreadMessages(sum);
        console.log("There was an unread messages event");
    });

    widgetRef.current.on('dashboard.NAVIGATE', (data) => {
      console.log("There was a navigate event");
  });
}

useEffect(() => {
  if (submitted) {
    renderWidget();
  }
  }, [submitted]);

const loadWidget = (service) => {
  if(service === "") {
    widgetRef.current.toggle(false);
    setYourApp(true);
  }
  else {
    widgetRef.current.load(service, service==="Team" ? "Full" : null);
    widgetRef.current.toggle(true);  
    setYourApp(false); 
  }  
}

  if (submitted) {
    return (
      <div className={styles.appContainer}>
        <div className={styles.verticalTabContainer}>
          <button onClick={() => loadWidget('')}>Your App</button>
          <button onClick={() => loadWidget('Team')} style={{ position: 'relative' }}>
          Team Chat
            {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
          </button>
          <button onClick={() => loadWidget('Drive')}>Drive</button>
          <button onClick={() => loadWidget('Contacts')}>Contacts</button>
        </div>
        {yourApp && <div>Your app goes here</div>}

        <div ref={container} className={styles.widgetContainer}></div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'}}>Netsapiens App</div>
    <form onSubmit={handleSubmit}>
    <label>
    SSO Token:
    <input type="text" value={token} onChange={handleTokenChange} />
    </label>
    <br />
    <label>
    Host ID:
    <input type="text" value={hostId} onChange={handleHostIdChange} />
    </label>
    <br />
    <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default App;