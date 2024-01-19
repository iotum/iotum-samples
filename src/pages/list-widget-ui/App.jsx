import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatRoomList from './ChatRoomList';
import * as Callbridge from '@iotum/callbridge-js';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';

const App = () => {
  useGuardedRoute()
  const [allRooms, setAllRooms] = useState([]);

  // Retrieve credentials from Redux store
  const credentials = useSelector(state => state.credentials);

  const toggleRoom = (path, open) => {
    setAllRooms(prevRooms => prevRooms.map(room => {
      return room.path === path ? { ...room, bool: open } : room;
    }));
  };

  const renderWidget = ({ domain, token, hostId }) => {
    const _widget = new Callbridge.Dashboard(
      {
        domain,
        sso: {
          token,
          hostId
        },
        container: '#chat',
      },
      Callbridge.Service.Team,
      {
        layout: Callbridge.LayoutOption.list,
        pathname: '/'
      }
    );

    _widget.once('dashboard.ROOM_LIST', (data) => {
      const uniqueAccountNames = [];
      const allRoomsChange = Object.values(data.rooms).map((room) => {
        const accounts = room.accounts.map((account) => account.name);

        if (accounts.length === 1) {
          const accountName = `${accounts[0]} (you)`;
          uniqueAccountNames.push(accounts[0]);
          return {
            name: accountName,
            path: room.path,
            bool: false,
          };
        }

        const filteredNames = accounts.filter((name) => !uniqueAccountNames.includes(name));
        return {
          name: filteredNames.join(', '),
          path: room.path,
          bool: false,
        };
      });

      setAllRooms(allRoomsChange);

      document.querySelector('#loading')?.remove();
    });

    return _widget;
  };

  useEffect(() => {
    if (credentials && credentials.token && credentials.domain && credentials.hostId) {
      const widget = renderWidget(credentials);

      // NOTE: for whatever reason, calling toggle directly causes StrictMode to unmount the widget container.
      setTimeout(() => widget.toggle(false));

      return () => {
        widget.unload();
      };
    }
  }, [credentials]); // useEffect dependencies

  return (
    <div>
      <div id="room-buttons">
        <ChatRoomList
          rooms={allRooms}
          onRoomButtonClick={(path) => toggleRoom(path, true)}
          onRoomClose={(path) => toggleRoom(path, false)}
        />
      </div>
      <div id="chat"><div id="loading">Loading...</div></div>
    </div>
  );
};

export default App;
