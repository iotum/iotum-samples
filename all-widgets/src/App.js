import { useEffect } from 'react';

function App() {
  useEffect(() => {
    //Meeting
    new Callbridge.Meeting({"domain":"iotum.callbridge.rocks","container":"#meeting_container"}, 6387062, {"name":"Guest","view":"left_side_speaker","tiles":4,"resolution":180,"mute":{"mic":true,"camera":true}});
    //Livestream
    new Callbridge.Livestream({"domain":"iotum.callbridge.rocks","container":"#livestream_container"}, 6387062, {"name":"test"});
    //Team
    new Callbridge.Dashboard({"domain":"iotum.callbridge.rocks","container":"#team_container"}, "Team", {});
    //Contacts
    new Callbridge.Dashboard({"domain":"iotum.callbridge.rocks","container":"#contacts_container"}, "Contacts", {});
    //Drive
    new Callbridge.Dashboard({"domain":"iotum.callbridge.rocks","container":"#drive_container"}, "Drive", {});
  });

  return (
    <div className="App">
    <div style={{display: "flex"}}>
    <div id="meeting_container"></div>
    <div id="livestream_container"></div>
    <div id="team_container"></div>
    <div id="contacts_container"></div>
    <div id="drive_container"></div>
    </div>
    </div>
  );
}

export default App;
