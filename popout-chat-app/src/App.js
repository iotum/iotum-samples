import * as Callbridge from '@iotum/callbridge-js';
import React, { useState} from 'react';
import styles from './submitForm.module.css'; 

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); //Loading status of unread messages

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
  //this widget listens for the number of unread messages 
  invisibleWidget.on('dashboard.UNREAD_MESSAGES', (data) => {
  const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
  setUnreadMessages(sum);
  //the widget has finished loading the amount of unread messages
  setIsLoading(false);
  });
  // Hide the form page
  setSubmitted(true);
  };


  const renderChatWidget = () => {
    //chatWidget is the widget that opens in a new window when you press the chat button
    let chatWidget = new Callbridge.Dashboard(
          {
            domain: 'iotum.callbridge.rocks',
            sso: {
              token: token,
              hostId: hostId,
            },
            container: window,
            // target: {
            //   name: "popout-chat-app",
            //   features: "width=780, height=360",
            //   checkExisting: true
            // }
          },
          "Team",
          { layout: 'full',}
      );
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

  //submit SSo token and hostId page: 
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
