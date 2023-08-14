import React, {useRef, useEffect } from 'react';
import * as Callbridge from '@iotum/callbridge-js';
import styles from './chat.module.css'; // Import the CSS file for styling

const ChatRoom = (props) => {
  const chatContainerRef = useRef(null); // Create a reference to the chat container

  useEffect(() => {
    console.log("A new chat room was opened: " + props.path);
    // This code will run after the component has rendered and the #chat container is available in the DOM
    const chatRoom = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        container: chatContainerRef.current, // Use the DOM element reference
      },
      'Team',
      { layout: 'main', pathname: props.path }
    );

  }, [props.path]);

  return <div ref={chatContainerRef} className={styles.chatRoom}></div>;
};

export default ChatRoom;
