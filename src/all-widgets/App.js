import { useEffect } from 'react';
import * as Callbridge from '@iotum/callbridge-js';

function App() {
  useEffect(() => {
    //Meeting
    const meeting = new Callbridge.Meeting({ "domain": "iotum.callbridge.rocks", "container": "#meeting_container" }, 6387062, { "name": "Guest", "view": "left_side_speaker", "tiles": 4, "resolution": 180, "mute": { "mic": true, "camera": true } });
    //Livestream
    const livestream = new Callbridge.Livestream({ "domain": "iotum.callbridge.rocks", "container": "#livestream_container" }, 6387062, { "name": "test" });
    //Team
    const team = new Callbridge.Dashboard({ "domain": "iotum.callbridge.rocks", "container": "#team_container" }, "Team", {});
    //Contacts
    const contacts = new Callbridge.Dashboard({ "domain": "iotum.callbridge.rocks", "container": "#contacts_container" }, "Contacts", {});
    //Drive
    const drive = new Callbridge.Dashboard({ "domain": "iotum.callbridge.rocks", "container": "#drive_container" }, "Drive", {});

    return () => {
      meeting.unload();
      livestream.unload();
      team.unload();
      contacts.unload();
      drive.unload();
    }
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
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