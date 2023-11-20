import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './submitForm.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';
import * as Callbridge from '@iotum/callbridge-js';
import { useSelector } from 'react-redux';

const App = () => {
  const [accessCode, setAccessCode] = useState('');
  const container = useRef(null);
  const widget = useRef(null);

  const credentials = useSelector(state => state.credentials);

  const handleAccessCode = (event) => {
    setAccessCode(event.target.value);
  }

  const renderWidget = useCallback(() => {
    console.log("render meeting widget");

    if (widget.current) {
      widget.current.unload();
    }

    widget.current = new Callbridge.Meeting(
      {
        domain: credentials.domain, 
        sso: {
          token: credentials.token,
          hostId: credentials.hostId
        },
        container: container.current,
      },
      accessCode, 
      {
        skipJoin: true
      }
    );
  }, [credentials, accessCode]); // Dependencies: credentials and accessCode

  useEffect(() => {
    renderWidget();

    // Cleanup function to unload the widget
    return () => {
      if (widget.current) {
        widget.current.unload();
        console.log("widget unloaded");
      }
    };
  }, [renderWidget]); // Effect dependency: renderWidget

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
        <button className={styles.startMeetingButton} onClick={renderWidget}>Start Meeting</button>
      </div>
      <TokenButton position='right'/>
      <MenuButton position="right"/>
      <div ref={container} className={styles.widgetContainer}></div>  
    </div>
  );
};

export default App;