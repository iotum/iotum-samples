import ChatRoom from '../../components/ChatRoom/ChatRoom';
import styles from '../../components/ChatRoom/chat.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';

const ChatRoomList = ({ rooms, onRoomButtonClick, onRoomClose, children }) => {
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
        <TokenButton position='right'/>
        <MenuButton position="right"/>
        {children}
      </div>
    </div>
  );
};

export default ChatRoomList;