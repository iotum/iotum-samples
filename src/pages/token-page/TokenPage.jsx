import { useState, useEffect } from 'react';
import { setCredentials, clearCredentials } from '../../components/credentials';
import CredentialsForm from "../../components/CredentialsForm";
import { useNavigate } from 'react-router';
import './TokenPage.css'

export const TokenPage = () => {
  const [credentialsSubmitted, setCredentialsSubmitted] = useState(false);
  const navigate = useNavigate();

  //Clear the credentials when navigating to the TokenPage. 
  useEffect(() => {
      clearCredentials();
  }, []);

  const handleCredentialsSubmit = (credentials) => {
      console.log('Credentials submitted');
      
      setCredentials({
          token: credentials.token,
          domain: credentials.domain,
          hostId: credentials.hostId
      });
      
      // Indicate that the credentials have been submitted
      setCredentialsSubmitted(true);

      navigate('/iotum-samples/menu'); 
  };

  // Render the form or the result based on the credentials submission state
  return (
      <div>
          {!credentialsSubmitted ? (
              <CredentialsForm onSubmit={handleCredentialsSubmit} />
          ) : (
              <p>Credentials submitted successfully!</p>
          )}
      </div>
  );
};

export default TokenPage;