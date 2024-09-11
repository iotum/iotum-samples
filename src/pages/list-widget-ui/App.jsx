import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ChatRoomList from './ChatRoomList';
import * as Callbridge from '@iotum/callbridge-js';
import LoadingWidget from '../../components/LoadingWidget';
import useGuardedRoute from '../../components/hooks/useGuardedRoute';
import OpenFullAppButton from '../../components/OpenFullAppButton';
import MenuButtonStyles from '../../navigation/MenuButton/MenuButton.module.css';

const App = () => {
  useGuardedRoute()

  const location = useLocation();

  const [error, setError] = useState('');

  const [allRooms, setAllRooms] = useState(
    /** @returns {Array} */
    () => JSON.parse(decodeURI(location.hash.slice(1)) || '[]').map(path => ({ path, bool: true }))
  );

  // Retrieve credentials from Redux store
  const credentials = useSelector(state => state.credentials);

  const toggleRoom = (path, open) => {
    setAllRooms(prevRooms => {
      const rooms = prevRooms.map(room => {
        return room.path === path ? { ...room, bool: open } : room;
      });
      const openRooms = rooms.filter(room => room.bool).map(room => room.path);
      window.history.pushState(null, '', '#' + (openRooms.length ? JSON.stringify(openRooms) : ''));
      return rooms;
    });
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

    _widget.on('widget.ERROR', (error) => {
      console.error('Widget error:', error);
      setError(JSON.stringify(error));
    });

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

      setAllRooms(
        prevRooms => allRoomsChange.map(
          room => ({
            ...room,
            bool: Boolean(prevRooms.find(prevRoom => prevRoom.path === room.path))
          })
        )
      );

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
        >
          <div className={MenuButtonStyles.extraMenu}>
            <OpenFullAppButton {...credentials} />
          </div>
        </ChatRoomList>
      </div>
      <div id="chat"><LoadingWidget id="loading" error={error} /></div>
    </div>
  );
};

export default App;
