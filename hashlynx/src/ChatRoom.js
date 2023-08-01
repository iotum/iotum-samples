import React, { useState, useRef, useEffect } from 'react';
import * as Callbridge from '@iotum/callbridge-js';
import styles from './chat.module.css'; // Import the CSS file for styling

const ChatRoom = (props) => {
  const chatContainerRef = useRef(null); // Create a reference to the chat container

  useEffect(() => {
    // This code will run after the component has rendered and the #chat container is available in the DOM
    const chatRoom = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        sso: {
          token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
          hostId: '62821',
        },
        container: chatContainerRef.current, // Use the DOM element reference
      },
      'Team',
      { layout: 'main', pathname: props.path }
    );

  }, [props.path]);

  return <div ref={chatContainerRef} className={styles.chatRoom}></div>;
};

export default ChatRoom;
