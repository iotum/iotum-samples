import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [domain, setDomain] = useState('iotum.callbridge.rocks'); // default domain

  const container = useRef(null);
  const widget = useRef(null);

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleAccessCode = (event) => {
    setAccessCode(event.target.value)
  }

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  }

  const renderWidget = () => {
    console.log("render meeting widget")

    if (widget.current) {
      widget.current.unload();
    }
    widget.current = new Callbridge.Meeting(
      {
        domain: domain, // Use the domain from state
        sso: {
          token: token,
          hostId: hostId
        },
        container: container.current,
      },
      accessCode, 
      {
        skipJoin: true
      }
    )
  }

  if (submitted) {
    return (
      <div className={styles.appContainer}>
        <div className={styles.startButton}>
          <div className={styles.accessCodeLabel}>Access Code:</div>
          <input
            type="text"
            className={styles.accessCodeInput}
            value={accessCode}
            onChange={handleAccessCode}
          />
          <button className={styles.startMeetingButton} onClick={() => renderWidget()}>Start Meeting</button>
        </div>
        <div ref={container} className={styles.widgetContainer}></div>  
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'}}>Simple Meeting App</div>
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
