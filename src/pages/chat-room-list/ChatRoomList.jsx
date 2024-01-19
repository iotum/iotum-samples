import ChatRoom from '../../components/ChatRoom/ChatRoom';
import styles from '../../components/ChatRoom/chat.module.css';
import TokenButton from '../../navigation/TokenButton/TokenButton';
import MenuButton from '../../navigation/MenuButton/MenuButton';

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
        <TokenButton position='right'/>
        <MenuButton position="right"/>
      </div>
  );
};

export default ChatRoomList;