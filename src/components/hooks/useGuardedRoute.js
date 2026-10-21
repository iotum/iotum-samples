// useGuardedRoute.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCredentials } from '../credentials';

const useGuardedRoute = () => {
  const navigate = useNavigate();
  const { token } = useCredentials();
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/iotum-samples/error-handling');
      console.log('New credentials input needed');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useGuardedRoute;
