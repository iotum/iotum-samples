import * as Callbridge from '@iotum/callbridge-js';
import React, {useState, useRef} from 'react';
import styles from './submitForm.module.css'; 

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); //Loading status of unread messages
  const [domain, setDomain] = useState('iotum.callbridge.rocks'); //default domain

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
  //on submit -> get the number of unread messages 
    const container = document.createElement('div');
    container.style.display = 'none';
    const invisibleWidget = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        sso: {
          token: token,
          hostId: hostId,
        },
        container: container,
      },
      "Team",
    );

    invisibleWidget.on('dashboard.UNREAD_MESSAGES', (data) => {
    const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
    setUnreadMessages(sum);
    setIsLoading(false);
    });
    // Hide the form page
    setSubmitted(true);
  };

  const renderChatWidget = () => {
    if (!widget.current || !widget.current.instance) {
      console.log("Create a new widget because the window was closed/there never was a widget")
        widget.current = new Callbridge.Dashboard(
          {
            domain: domain, // using the state variable for domain
            sso: {
              token: token,
              hostId: hostId,
            },
            container: window,
            target: {
              name: "CallbridgeChatWidget",
              checkExisting: true,
            }
          },
          'Team',
        );

        widget.current.on('dashboard.NAVIGATE', (data)=> {
          console.log("navigate event");
        })
    }
      else if(widget.current.instance) {
        console.log("Change focus to the existing widget that's open in a new window")
        widget.current.instance.focus();
      }
  }

  if(submitted) {
    if (isLoading) {
      return (
        <div>Loading unread messages...</div> 
      )
    }

    return (
      <div className={styles.chatContainer}>
        <button className={styles.biggerButton} onClick={() => {
          renderChatWidget()
        }}>Chat</button>
        <span className={styles.badge}>{unreadMessages}</span>
      </div>
    );
  }

  //submit SSO token and hostId page: 
  if(!submitted) {
    return (
      <div className="form-wrapper">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'}}>Popout Chat App</div>
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
};

export default App;
