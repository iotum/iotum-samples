import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../components/ReduxStore';
import CredentialsForm from "../../components/CredentialsForm";
import { useNavigate } from 'react-router-dom';
import './TokenPage.css'

export const TokenPage = () => {
  const [credentialsSubmitted, setCredentialsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Clear the credentials when navigating to the TokenPage. 
  useEffect(() => {
      // Dispatch an action to reset the credentials in the Redux store
      dispatch(setCredentials({ token: null, url: null, hostId: null }));
  }, [dispatch]);

  const handleCredentialsSubmit = (credentials) => {
      console.log('Credentials submitted');
      
      // Store the credentials in the Redux state
      dispatch(setCredentials({
          token: credentials.token,
          domain: credentials.domain,
          hostId: credentials.hostId
      }));
      
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