import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import ChatRoomList from './ChatRoomList';

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // const [allRooms, setallRooms] = useState([{path: "/room/306213", bool: false}, {path: "/room/420581", bool: false}, {path: "/room/419290", bool: false}, {path: "/room/419809", bool: false}]);
  const [allRooms, setallRooms] = useState([]);
  const [ready, setReady] = useState(false);

  const chat_container = useRef(null);

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  }

  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  }

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleClick = (data) => {
    setallRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === data.pathname) {
          return { ...room, bool: true };
        } else {
          return { ...room, bool: false };
        }
      });
    });
  };


  useEffect(() => {
      const container = document.createElement('div');
      const widget = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        sso: {
        token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
        hostId: '62821',
      },
      // container: '#chat', // Use the container reference
      container: container, // Use the container reference
      },
      "Team",
      );
  
      widget.once('dashboard.ROOM_LIST', (data) => {
        const allRoomschange = Object.values(data.rooms).map(room => ({ path: room.path, bool: false }));
        setallRooms(allRoomschange);
        setReady(true);
      })
  }, []);


useEffect(() => {
  if(submitted) {
    const widget = new Callbridge.Dashboard(
    {
      domain: 'iotum.callbridge.rocks',
      sso: {
      token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
      hostId: '62821',
    },
    container: chat_container.current, // Use the container reference
    },
    "Team",
    {layout: "list"}
    );

    // widget.once('dashboard.ROOM_LIST', (data) => {
    //   const allRoomschange = Object.values(data.rooms).map(room => ({ path: room.path, bool: false }));
    //   setallRooms(allRoomschange);
    //   setReady(true);
    // })

    widget.on('dashboard.NAVIGATE', (data) => {
      console.log("navigate");
      handleClick(data);
    })
  }
}, [submitted]);
//this function will only run once because submitted only changes once to true

  if (submitted) {
    console.log("The page re-rendered")
    console.log(allRooms);
    return (
      <div>
      <div ref={chat_container}></div>
      {ready && <ChatRoomList rooms={allRooms} />}
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          SSO Token:
          <input type="text" value={token} onChange={handleTokenChange} />
        </label>
        <br />
        <label>
          Host ID:
          <input type="text" value={hostId} onChange={handleHostIdChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <div id="chat"></div>
    </div>
  );
}

export default App;
