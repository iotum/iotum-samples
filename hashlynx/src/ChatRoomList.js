import React from 'react';
import ChatRoom  from './ChatRoom';

const ChatRoomList = ({rooms}) => {
  // console.log(rooms.paths);
  let allRooms = [];
  
  for(let i = 0, count=0; i<rooms.length; i++) {
    if(rooms[i].bool){

      // console.log("THESE ARE THE ROOM PATHS" + rooms[i].path);
      allRooms[count] = <ChatRoom path={rooms[i].path} key={rooms[i].path} />;
      count++;
    }
  }

  return <div>{allRooms}</div>


  // return (
  //   <div>
  //   <ChatRoom path="/room/419290" />
  //   <ChatRoom path="/room/306213"/>

  //   </div>
  // )


};


export default ChatRoomList;
