// useGuardedRoute.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const useGuardedRoute = () => {
  const navigate = useNavigate();
  const { token } = useSelector(state => state.credentials);
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
