import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './CredentialsForm.css'

const CredentialsForm = ({ onSubmit }) => {
  const credentials = useSelector(state => state.credentials);

  const [domain, setDomain] = useState(credentials.domain || 'iotum.callbridge.rocks');
  const [token, setToken] = useState(credentials.token || '');
  const [hostId, setHostId] = useState(credentials.hostId || '');

  // This function will be called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the passed onSubmit function with the local state values
    onSubmit({ domain, token, hostId });
  };

  return (
    <div className="form-wrapper">
      <h1 className="title">iotum Sample Apps</h1>
      <form onSubmit={handleSubmit} className="credentials">
        <label>
          Domain:
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          SSO Token:
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Host ID:
          <input
            type="text"
            value={hostId}
            onChange={(e) => setHostId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CredentialsForm;
