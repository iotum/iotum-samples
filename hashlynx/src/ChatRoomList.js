import React from 'react';
import ChatRoom  from './ChatRoom';

const ChatRoomList = ({rooms}) => {
  let allRooms = [];
  
  for(let i = 0, count=0; i<rooms.length; i++) {
    if(rooms[i].bool){
      allRooms[count] = <ChatRoom path={rooms[i].path} key={rooms[i].path} />;
      count++;
    }
  }

  return <div>{allRooms}</div>
};


export default ChatRoomList;
