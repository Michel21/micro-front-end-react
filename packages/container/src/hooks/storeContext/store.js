import { useState, useCallback } from 'react';

import api from '../../services/api';

export default function useStore() {
  const [authenticated, setAuthenticated] = useState(false);

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Mfe:token');
    const user = localStorage.getItem('@Mfe:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setAuthenticated(true);
      return { token, user: JSON.parse(user) }
    }
    return {token, user: JSON.parse(user)};
  });

  const updateUser = useCallback((user) => {
    localStorage.setItem('@Mfe:user', JSON.stringify(user));
    setData({
      token: data.token,
      user,
    })
  }, [setData, data.token]);
  
  const handleLogin = useCallback(() => {
    const token = localStorage.getItem('@Mfe:token');
    const user = JSON.parse(localStorage.getItem('@Mfe:user'));
    if(user && token){
      setData({token, user});
      setAuthenticated(true);
    }
  },[])

  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    localStorage.removeItem('@Mfe:token');
    localStorage.removeItem('@Mfe:user');
    api.defaults.headers.Authorization = undefined;
    setData({});
  },[]);
  
  return { authenticated, handleLogout, handleLogin, data, updateUser };
}