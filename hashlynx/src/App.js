import * as Callbridge from '@iotum/callbridge-js';
import React, { useState, useRef, useEffect } from 'react';
import styles from './submitForm.module.css';

function App() {
  const [token, setToken] = useState('');
  const [hostId, setHostId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const container = useRef(null);

  const handleSubmit = () => {
    setSubmitted(true);
  };

useEffect(() => {
  if(submitted) {
    console.log(container.current)
    const widget = new Callbridge.Dashboard(
    {
      domain: 'iotum.callbridge.rocks',
      sso: {
      token: '7c0d18cbd52f88f89446a9cfe59ee9901f2eaa2e40f7c3474b9ed5b34959d3c9',
      hostId: '62821',
    },
    container: container.current, // Use the container reference
    },
    "Team",
    {layout: "list"}
    );
  }
}, [submitted]);



  if (submitted) {
    return (
      <div ref={container}></div>
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
