// useGuardedRoute.js
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useGuardedRoute = () => {
  const navigate = useNavigate();
  const { token } = useSelector(state => state.credentials);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      navigate('/iotum-samples/error-handling');
      console.log('New credentials input needed');
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]);

  return isAuthenticated;
};

export default useGuardedRoute;
