import React from 'react';
import ChatRoom from './ChatRoom';
import styles from './chat.module.css';
import HomeButton from '../../components/HomeButton';

const ChatRoomList = ({ rooms, onRoomClose }) => {
  return (
      <div className={styles.chatRoomsContainer}>
        {rooms.map((room) =>
          room.bool && (
            <div key={room.path} className={`${styles.chatRoom} ${styles.activeRoom}`}>
              <ChatRoom path={room.path} />
              <button
                className={styles.closeButton}
                onClick={() => onRoomClose(room.path)}
              >
                x
              </button>
            </div>
          )
        )}
        <HomeButton position="right"/>
      </div>
  );
};

export default ChatRoomList;