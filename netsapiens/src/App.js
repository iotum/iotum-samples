import * as Callbridge from '@iotum/callbridge-js';
import React, { useState} from 'react';
import styles from './submitForm.module.css'; 

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };
  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  };
  
  const handleSubmit = () => {
  //on submit -> get the number of unread messages 
  const container = document.createElement('div');
  container.style.display = 'none';
  const fakeWidget = new Callbridge.Dashboard(
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
  //event listens for the numbe rof unread messages ONE time 
  fakeWidget.once('dashboard.UNREAD_MESSAGES', (data) => {
  let sum = 0;
  for (const key in data.rooms) {
    if (data.rooms.hasOwnProperty(key)) {
      sum += data.rooms[key];
    }
  }
  setUnreadMessages(sum);
  setIsLoading(false);
  fakeWidget.unload();
  });
  // Hide the form page
  setSubmitted(true);
  };


  const renderChatWidget = () => {
    let widget = new Callbridge.Dashboard(
          {
            domain: 'iotum.callbridge.rocks',
            sso: {
              token: token,
              hostId: hostId,
            },
            container: window,
          },
          "Team",
          { layout: 'full' }
      );

      widget.on('dashboard.UNREAD_MESSAGES', (data) => {
        let sum = 0;
        for (const key in data.rooms) {
          if (data.rooms.hasOwnProperty(key)) {
            sum += data.rooms[key];
          }
        }
        setUnreadMessages(sum);
        setShowChat(false);
      });
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
          setShowChat(true)
        }}>Chat</button>
        <span className={styles.badge}>{unreadMessages}</span>
        {showChat && renderChatWidget()}
      </div>
    );
  }

  if(!submitted) {
    return (
      <div className="form-wrapper">
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
};

export default App;
