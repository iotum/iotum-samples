import React from 'react';
import ChatRoom from './ChatRoom';
import styles from './chat.module.css';

const ChatRoomList = ({ rooms, onRoomButtonClick, onRoomClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.roomListContainer}>
        {rooms.map((room) => (
          <div key={room.path} className={styles.chatRoomItem}>
            <button
              onClick={() => onRoomButtonClick(room.path)}
              className={room.bool ? styles.active : ''}
            >
              {room.name}
            </button>
          </div>
        ))}
      </div>
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
      </div>
    </div>
  );
};

export default ChatRoomList;