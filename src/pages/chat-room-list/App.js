import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ChatRoomList from './ChatRoomList';
import styles from './submitForm.module.css';
import * as Callbridge from '@iotum/callbridge-js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const App = () => {
  useGuardedRoute()
  const [allRooms, setAllRooms] = useState([]);

  // Retrive credentials from Redux store
  const credentials = useSelector(state => state.credentials);

  const handleRoomButtonClick = (path) => {
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: true } : room;
    }));
  };

  const handleRoomClose = (path) => {
    console.log(path + " was closed");
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: false } : room;
    }));
  };

  const renderWidget = useCallback(({ domain, token, hostId }) => {
    console.log("renderWidget ran");
    const _widget = new Callbridge.Dashboard(
      {
        domain,
        sso: {
          token,
          hostId
        },
        container: '#chat',
      },
      'Team',
      { layout: 'list', pathname: '/' }
    );

    _widget.once('dashboard.ROOM_LIST', (data) => {
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

    _widget.on('dashboard.NAVIGATE', (data) => {
      if (data.pathname !== "/") {
        _widget.load("Team", { layout: "list" })
        console.log("There was a navigate event to " + data.pathname + " in the list widget and the list widget was reloaded");
      }

      handleRoomButtonClick(data.pathname);
    });

    _widget.on('dashboard.READY', () => {
      console.log("The list widget was rendered");
    });

    return _widget;
  }, []);

  useEffect(() => {
    if (credentials && credentials.token && credentials.domain && credentials.hostId) {
      const widget = renderWidget(credentials);
      return () => {
        widget.unload();
      }
    }
  }, [credentials, renderWidget]);

  return (
    <div className={styles.container}>
      <div id="chat" className={styles.roomListContainer}></div>
      <div>
        <ChatRoomList rooms={allRooms} onRoomClose={handleRoomClose} />
      </div>
    </div>
  );
};

export default App;
