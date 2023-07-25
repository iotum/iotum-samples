import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showMeetingWidget, setShowMeetingWidget] = useState(false);

  // Create a reference for the widget container
  const container = useRef(null);
  // Store a reference to the current widget instance
  const widgetRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleChatButtonClick = () => {
    setShowChatWidget(true);
    setShowMeetingWidget(false);
  };

  const handleMeetingButtonClick = () => {
    setShowChatWidget(false);
    setShowMeetingWidget(true);
  };

  const destroyWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.unload();
      widgetRef.current = null;
    }
  };

  const renderWidget = () => {
    destroyWidget(); // Destroy any existing widget before creating a new one

    if (showMeetingWidget) {
      console.log("meeting")
      widgetRef.current = new Callbridge.Meeting(
        {"domain":"iotum.callbridge.rocks",
        "sso":{
          "token":token,
          "hostId":hostId,
        },
        "container":container.current
      }, 
      undefined, 
      {"skipJoin":true})
    };

    if (showChatWidget) {
      console.log("chat")
      widgetRef.current = new Callbridge.Dashboard(
        {
          domain: 'iotum.callbridge.rocks',
          sso: {
            token: token,
            hostId: hostId,
          },
          container: container.current,
        },
        'Team',
        { layout: 'full' }
      );
    }
  }

  useEffect(() => {
    if (submitted) {
      renderWidget();
    }
    // Cleanup function to remove the widget when the component unmounts
    return () => {
      destroyWidget();
    };
  }, [submitted, showChatWidget, showMeetingWidget, activeTab]);

  if (submitted) {
    return (
    <div className={styles.appContainer}>
    <div className={styles.verticalTabContainer}>
      <button onClick={handleChatButtonClick}>Chat</button>
      <button onClick={handleMeetingButtonClick}>Meeting</button>
    </div>
    <div ref={container} className={styles.widgetContainer}></div>
  </div>
    );
  }

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

export default App;
