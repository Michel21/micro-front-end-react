import React, { createContext} from 'react';

import useStore from './hooks/store';

const Context = createContext();

function AuthProvider({ children }) {
  const {
    authenticated, loading, handleLogout, handleLogin
  } = useStore();

  return (
    <Context.Provider value={{ loading, authenticated, handleLogout, handleLogin }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };