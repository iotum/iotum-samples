// import * as Callbridge from '@iotum/callbridge-js';
// import React, { useState, useEffect } from 'react';
// import ChatRoomList from './ChatRoomList';


// const App = () => {
//   const [allRooms, setAllRooms] = useState([]);

//   const handleRoomButtonClick = (path) => {
//     setAllRooms((prevRooms) => {
//       return prevRooms.map((room) => {
//         if (room.path === path) {
//           return { ...room, bool: true}; // Toggle the boolean value
//         }
//         return room;
//       });
//     });
//   };

//   const handleRoomClose = (path) => {
//     setAllRooms((prevRooms) => {
//       return prevRooms.map((room) => {
//         if (room.path === path) {
//           return { ...room, bool: false };
//         }
//         return room;
//       });
//     });
//   };

//   useEffect(() => {
//     const widget = new Callbridge.Dashboard(
//       {
//         domain: 'iotum.callbridge.rocks',
//         sso: {
//           token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
//           hostId: '62821',
//         },
//         container: '#chat',
//       },
//       'Team',
//       { layout: 'list' }
//     );

//     widget.once('dashboard.ROOM_LIST', (data) => {
//       console.log(data);
//       const allRoomsChange = Object.values(data.rooms).map((room) => ({
//         name: room.accounts.map((account) => account.name).join(', '),
//         path: room.path,
//         bool: false,
//       }));
//       setAllRooms(allRoomsChange);
//     });

//     widget.toggle(false);
//   }, []);

//   return (
//     <div>
//       <div id="room-buttons">
//         <ChatRoomList
//           rooms={allRooms}
//           onRoomButtonClick={handleRoomButtonClick}
//           onRoomClose={handleRoomClose}
//         />
//       </div>
//       <div id="chat"></div>
//     </div>
//   );
// };

// export default App;



import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useEffect, useRef } from 'react';
import ChatRoomList from './ChatRoomList';


const App = () => {
  const [allRooms, setAllRooms] = useState([]);

  const widget = useRef(null);

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
    setAllRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.path === path) {
          return { ...room, bool: false };
        }
        return room;
      });
    });
  };

  useEffect(() => {
    widget.current = new Callbridge.Dashboard(
      {
        domain: 'iotum.callbridge.rocks',
        sso: {
          token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
          hostId: '62821',
        },
        container: '#chat',
      },
      'Team',
      { layout: 'list' }
    );

    widget.current.once('dashboard.ROOM_LIST', (data) => {
      const allRoomsChange = Object.values(data.rooms).map((room) => ({
        name: room.accounts.map((account) => account.name).join(', '),
        path: room.path,
        bool: false,
      }));
      setAllRooms(allRoomsChange);
    });

    // widget.toggle(false);
  }, []);
  

   
  useEffect(() => {
      if(allRooms.length > 0) {
      console.log(widget.current)
      widget.current.on('dashboard.NAVIGATE', (data) => {
        //open Chat Room: 
        console.log("This is the list widget right now:" + widget.Object)
        // if(allRooms.length > 0) {
          handleRoomButtonClick(data.pathname);
          // widget.current.go(-1);
          // widget._send('dashboard', 'go', {delta: -1})
        }
      )};
  }, [allRooms]);
  

  return (
    <div>
      <div id="room-buttons">
        <ChatRoomList
          rooms={allRooms}
          onRoomButtonClick={handleRoomButtonClick}
          onRoomClose={handleRoomClose}
        />
      </div>
      <div id="chat"></div>
    </div>
  );
};

export default App;
