import { useSelector } from 'react-redux';
import './CredentialsForm.css'

const CredentialsForm = ({ onSubmit }) => {
  const { domain, token, hostId } = useSelector(state => state.credentials);

  // This function will be called when the form is submitted
  /** @type {React.FormEventHandler<HTMLFormElement>} */
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    // Call the passed onSubmit function with the local state values
    onSubmit({
      domain: data.get('domain'),
      token: data.get('token'),
      hostId: data.get('hostId'),
    });
  };

  return (
    <div className="form-wrapper">
      <h1 className="title">iotum Sample Apps</h1>
      <form onSubmit={handleSubmit} className="credentials">
        <label>
          Domain:
          <input
            type="text"
            name="domain"
            defaultValue={domain || 'iotum.callbridge.rocks'}
            required
          />
        </label>
        <br />
        <label>
          SSO Token:
          <input
            type="text"
            name="token"
            defaultValue={token || ''}
            required
          />
        </label>
        <br />
        <label>
          Host ID:
          <input
            type="text"
            name="hostId"
            defaultValue={hostId || ''}
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
