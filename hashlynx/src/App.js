import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import ChatRoomList from './ChatRoomList';

function App() {
  const [allRooms, setallRooms] = useState([]);

  const handleClick = (data) => {
    setallRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === data.pathname) {
          return { ...room, bool: true };
        }
        return room; // Return the room unchanged if it's not the clicked one
      });
    });
  };
  

useEffect(() => {
    const widget = new Callbridge.Dashboard(
    {
      domain: 'iotum.callbridge.rocks',
      sso: {
      token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
      hostId: '62821',
    },
    container: "#chat",
    },
    "Team",
    {layout: "list"}
    );

    widget.once('dashboard.ROOM_LIST', (data) => {
      const allRoomschange = Object.values(data.rooms).map(room => ({ path: room.path, bool: false }));
      setallRooms(allRoomschange);
    })

    widget.on('dashboard.NAVIGATE', (data) => {
      console.log("navigate");
      handleClick(data);
    })
}, []);


    return (
      <div>
      <div id="chat"></div>
      <ChatRoomList rooms={allRooms} />
      </div>
    );
}
export default App;
