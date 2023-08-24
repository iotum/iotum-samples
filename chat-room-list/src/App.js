import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useEffect, useRef } from 'react';
import ChatRoomList from './ChatRoomList';
import styles from './submitForm.module.css';

const App = () => {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [allRooms, setAllRooms] = useState([]);

  const widget = useRef(null);

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };
  
  
  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleRoomButtonClick = (path) => {
    setAllRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === path) {
          return { ...room, bool: true}; // Toggle the boolean value
        }
        return room;
      });
    });
  };

  const handleRoomClose = (path) => {
    console.log(path + " was closed");
    setAllRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === path) {
          return { ...room, bool: false };
        }
        return room;
      });
    });
  };

  const renderWidget = () => {
    widget.current = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        sso: {
          token: token,
          hostId: hostId
        },
        container: '#chat',
      },
      'Team',
      { layout: 'list', pathname: '/'}
    );

    widget.current.once('dashboard.ROOM_LIST', (data) => {
      const uniqueAccountNames = []; // To keep track of account names that should have "(you)" added
      const allRoomsChange = Object.values(data.rooms).map((room) => {
        const accounts = room.accounts.map((account) => account.name);
    
        // Check if the room has only one account
        if (accounts.length === 1) {
          const accountName = `${accounts[0]} (you)`;
          uniqueAccountNames.push(accounts[0]); // Add the account name to the unique list
          return {
            name: accountName,
            path: room.path,
            bool: false,
          };
        }
    
        // Filter out account names that are in the unique list
        const filteredNames = accounts.filter((name) => !uniqueAccountNames.includes(name));
        return {
          name: filteredNames.join(', '),
          path: room.path,
          bool: false,
        };
      });
    
      setAllRooms(allRoomsChange);
    });

    widget.current.on('dashboard.NAVIGATE', (data) => {
      if (data.pathname !== "/") {
        widget.current.load("Team", {layout: "list"})
        console.log("There was a navigate event to " + data.pathname + " in the list widget and the list widget was reloaded");
      } 

      handleRoomButtonClick(data.pathname);
      }
    )

    widget.current.on('dashboard.READY', () => {
      console.log("The list widget was rendered");
    });
  }

  useEffect(() => {
    if (submitted) {
      renderWidget();
    }
  }, [submitted]);
  
  if (submitted) {
    return (
      <div className={styles.container}>
        <div id="chat" className={styles.roomListContainer}></div>

        <div>
          <ChatRoomList
            rooms={allRooms}
            onRoomClose={handleRoomClose}
          />
        </div>
      </div>
    );
  }


    return (
      <div className="form-wrapper">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold'}}>Chat Room List App</div>
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
      </div>
    );
  }

export default App;
