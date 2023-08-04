//There are two widgets: One for the team chat and one for drive/contacts 
import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';


// function App() {

// //   if ('serviceWorker' in navigator) {
// //   navigator.serviceWorker.getRegistrations().then(function (registrations) {
// //     for (let registration of registrations) {
// //       registration.unregister();
// //     }
// //   });
// // }


// const [token, setToken] = useState('');
// const [hostId, setHostId] = useState('');
// const [submitted, setSubmitted] = useState(false);
// const [yourApp, setYourApp] = useState(true); 
// const [unreadMessages, setUnreadMessages] = useState(); 
// const [start, setStart] = useState(); 

// // Create a reference for the widget container
// const container = useRef(null);
// const chatContainer = useRef(null);
// // Store a reference to the current widget instance
// const chatWidget  = useRef(null);
// const widget = useRef(null);


// const handleTokenChange = (event) => {
//   setToken(event.target.value);
// };


// const handleHostIdChange = (event) => {
//   setHostId(event.target.value);
// };


// const handleSubmit = () => {
//   setSubmitted(true);
// };

// //render two widgets 
// const renderWidget = () => {
//   console.log("Two widgets were rendered: A chat room widget and a widget for the drive/contacts");
//   console.log("Both these widgets start as invisible");

//   widget.current = new Callbridge.Dashboard(
//     {
//       domain: 'iotum.callbridge.rocks',
//       sso: {
//         token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
//         hostId: '62821',
//     },
//       container: container.current,
//     }, 
//   );
//     widget.current.toggle(false);

//     chatWidget.current = new Callbridge.Dashboard(
//       {
//         domain: 'iotum.callbridge.rocks',
//         sso: {
//           token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
//           hostId: '62821',
//       },
//         container: chatContainer.current,
//       },
//       "Team",
//     );
//       chatWidget.current.toggle(false);
  
//     chatWidget.current.on('dashboard.UNREAD_MESSAGES', (data) => {
//       console.log("There was an unread messages event")
//       const sum = Object.values(data.rooms).reduce((m, n) => m + n, 0);
//       setUnreadMessages(sum);
//     });
// }

// useEffect(() => {
//   if(start === true) {
//     chatWidget.current.on('dashboard.NAVIGATE', (data) => {
//       if (data.pathname != '/') {
//         loadWidget('Team');
//         console.log("The chat widget navigated to this room: " + data.pathname);
//       }
//       else {
//         console.log("The chat widget navigated to an unspecified room");
//       }
//   });
//   }

// }, [start])

// useEffect(() => {
//   if (submitted) {
//     renderWidget();
//   }
//   }, [submitted]);

// const loadWidget = (service) => {
//   if(service === "") {
//     widget.current.toggle(false);
//     chatWidget.current.toggle(false);
//     chatWidget.current.load("Team", {layout: "full", pathname: "/"})
//     chatWidget.current.toggle(false);
//     setYourApp(true);
//     console.log("Load your app")
//   }
//   else if (service === "Team") {
//     setStart(true);
//     chatWidget.current.toggle(true);
//     widget.current.toggle(false);  
//     setYourApp(false); 
//     console.log("Load the team chat widget")
//   }  else {
//     setStart(true); 
//     widget.current.toggle(true); 
//     widget.current.load(service);
//     chatWidget.current.toggle(false);
//     chatWidget.current.load("Team", {layout: "full", pathname: "/"})
//     chatWidget.current.toggle(false);
//     console.log("Load the " + service +  " widget")
//     setYourApp(false); 
//   }
// }



//   if (submitted) {
//     return (
//       <div className={styles.appContainer}>
//         <div className={styles.verticalTabContainer}>
//           <button onClick={() => loadWidget('')}>Your App</button>
//           <button onClick={() => loadWidget('Team')} style={{ position: 'relative' }}>
//           Team Chat
//             {unreadMessages > 0 && <span className={styles.badge}>{unreadMessages}</span>}
//           </button>
//           <button onClick={() => loadWidget('Drive')}>Drive</button>
//           <button onClick={() => loadWidget('Contacts')}>Contacts</button>
//         </div>
//         {yourApp && <div>Your app goes here</div>}

//         <div ref={container} className={styles.widgetContainer}></div>
//         <div ref={chatContainer} className={styles.widgetContainer}></div>
//       </div>
//     );
//   }


//   return (
//     <div className="form-wrapper">
//     <form onSubmit={handleSubmit}>
//     <label>
//     SSO Token:
//     <input type="text" value={token} onChange={handleTokenChange} />
//     </label>
//     <br />
//     <label>
//     Host ID:
//     <input type="text" value={hostId} onChange={handleHostIdChange} />
//     </label>
//     <br />
//     <button type="submit">Submit</button>
//     </form>
//     </div>
//   );
// }


// export default App;



// //There are two widgets: One for the team chat and one for drive/contacts 
// function App() {
//   const [token, setToken] = useState('');
//   const [hostId, setHostId] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [showChatWidget, setShowChatWidget] = useState(false);
//   const [showContacts, setShowContacts] = useState(false);
//   const [showDrive, setShowDrive] = useState(false);
  
  
//   // Create a reference for the widget container
//   const container = useRef(null);
//   // Store a reference to the current widget instance
//   const widgetRef = useRef(null);
  
  
//   const handleTokenChange = (event) => {
//     setToken(event.target.value);
//   };
  
  
//   const handleHostIdChange = (event) => {
//     setHostId(event.target.value);
//   };
  
  
//   const handleSubmit = () => {
//     setSubmitted(true);
//   };
  
  
//   const handleChatButtonClick = () => {
//     setShowChatWidget(true);
//     setShowDrive(false);
//     setShowContacts(false);
//   };
  
  
//   const handleDriveButtonClick = () => {
//     setShowChatWidget(false);
//     setShowDrive(true);
//     setShowContacts(false);
//   };
  
  
//   const handleContactsButtonClick = () => {
//     setShowChatWidget(false);
//     setShowDrive(false);
//     setShowContacts(true);
//   };
  
  
//   const destroyWidget = () => {
//     if (widgetRef.current) {
//       widgetRef.current.unload();
//       widgetRef.current = null;
//     }
//   };
  
  
//   const renderWidget = () => {
//     destroyWidget(); // Destroy any existing widget before creating a new one
  
  
//     if (showChatWidget) {
//       widgetRef.current = new Callbridge.Dashboard(
//       {
//       domain: 'iotum.callbridge.rocks',
//       sso: {
//       token: token,
//       hostId: hostId,
//       },
//       container: container.current,
//       },
//       'Team',
//       { layout: 'full' }
//       );
//     }
  
  
//     else if (showDrive) {
//       widgetRef.current = new Callbridge.Dashboard(
//       {
//       domain: 'iotum.callbridge.rocks',
//       sso: {
//       token: token,
//       hostId: hostId,
//       },
//       container: container.current,
//       },
//       'Drive'
//       );
//     }
  
  
//     else if (showContacts) {
//       widgetRef.current = new Callbridge.Dashboard(
//       {
//       domain: 'iotum.callbridge.rocks',
//       sso: {
//       token: token,
//       hostId: hostId,
//       },
//       container: container.current,
//       },
//       'Contacts'
//       );
//     }
//   }
  
  
//   useEffect(() => {
//     if (submitted) {
//       renderWidget();
//     }
//   // Cleanup function to remove the widget when the component unmounts
//     return () => {
//       destroyWidget();
//     };
//     }, [submitted, showChatWidget, showContacts, showDrive]);
  
  
//     if (submitted) {
//       return (
//         <div className={styles.appContainer}>
//         <div className={styles.verticalTabContainer}>
//         <button onClick={handleChatButtonClick}>Team Chat</button>
//         <button onClick={handleDriveButtonClick}>Drive</button>
//         <button onClick={handleContactsButtonClick}>Contacts</button>
//         </div>
//         <div ref={container} className={styles.widgetContainer}></div>
//         </div>
//       );
//     }
  
  
//     return (
//       <div className="form-wrapper">
//       <form onSubmit={handleSubmit}>
//       <label>
//       SSO Token:
//       <input type="text" value={token} onChange={handleTokenChange} />
//       </label>
//       <br />
//       <label>
//       Host ID:
//       <input type="text" value={hostId} onChange={handleHostIdChange} />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//       </form>
//       </div>
//     );
//   }
  
  
//   export default App;






//There are two widgets: One for the team chat and one for drive/contacts 
function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showDrive, setShowDrive] = useState(false);
  
  
  // Create a reference for the widget container
  // const container = useRef(null);
  const chatContainer = useRef(null);
  const driveContainer = useRef(null);
  const contactContainer = useRef(null);
  // Store a reference to the current widget instances
  const chatRef = useRef(null);
  const driveRef = useRef(null);
  const contactRef = useRef(null);
  
  
  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };
  
  
  const handleHostIdChange = (event) => {
    setHostId(event.target.value);
  };
  
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  
  const handleChatButtonClick = () => {
    // chatRef.current.toggle(true);
    // driveRef.current.toggle(false);
    // contactRef.current.toggle(false);
  };
  
  
  const handleDriveButtonClick = () => {
    // chatRef.current.toggle(false);
    // driveRef.current.toggle(true);
    // contactRef.current.toggle(false);
  };
  
  
  const handleContactsButtonClick = () => {
    // chatRef.current.toggle(false);
    // driveRef.current.toggle(false);
    // contactRef.current.toggle(true);
  };
  
  
  // const destroyWidget = () => {
  //   if (widgetRef.current) {
  //     widgetRef.current.unload();
  //     widgetRef.current = null;
  //   }
  // };
  
  
  const renderWidgets = () => {
      chatRef.current = new Callbridge.Dashboard(
      {
      domain: 'iotum.callbridge.rocks',
      sso: {
      token: token,
      hostId: hostId,
      },
      container: chatContainer.current,
      },
      'Team',
      { layout: 'full' }
      );

      // chatRef.current.toggle(false);

      driveRef.current = new Callbridge.Dashboard(
      {
      domain: 'iotum.callbridge.rocks',
      sso: {
      token: token,
      hostId: hostId,
      },
      container: driveContainer.current,
      },
      'Drive'
      );

      // driveRef.current.toggle(false);
  
  
      contactRef.current = new Callbridge.Dashboard(
      {
      domain: 'iotum.callbridge.rocks',
      sso: {
      token: token,
      hostId: hostId,
      },
      container: contactContainer.current,
      },
      'Contacts'
      );

      // contactRef.current.toggle(false);
  }
  
  
  useEffect(() => {
    if (submitted) {
      renderWidgets();
    }
    }, [submitted]);
  
  
    if (submitted) {
      return (
        <div className={styles.appContainer}>
        <div className={styles.verticalTabContainer}>
        <button onClick={handleChatButtonClick}>Team Chat</button>
        <button onClick={handleDriveButtonClick}>Drive</button>
        <button onClick={handleContactsButtonClick}>Contacts</button>
        </div>
        <div ref={chatContainer} className={styles.widgetContainer}></div>
        <div ref={driveContainer} className={styles.widgetContainer}></div>
        <div ref={contactContainer} className={styles.widgetContainer}></div>
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
      </div>
    );
  }
  
  
  export default App;