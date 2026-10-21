// useGuardedRoute.js
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useCredentials } from '../credentials';

const useGuardedRoute = () => {
  const [, navigate] = useLocation();
  const { token } = useCredentials();
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/error-handling');
      console.log('New credentials input needed');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};

export default useGuardedRoute;
