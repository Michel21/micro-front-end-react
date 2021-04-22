import { useState, useEffect } from 'react';

import api from '../../services/api';
import history from '../../history/history';

export default function useStore() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@Mfe:token');
    if (token) {
      setAuthenticated(true);
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    setLoading(false);
  }, [authenticated]);
  
  function handleLogin() {
    setAuthenticated(true);
    setLoading(false);
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('@Mfe:token');
    localStorage.removeItem('@Mfe:user');
    api.defaults.headers.Authorization = undefined;
    history.push('/');
  }
  
  return { authenticated, loading, handleLogout, handleLogin };
}