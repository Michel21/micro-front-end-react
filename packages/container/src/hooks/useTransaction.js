import React, { createContext, useContext} from 'react';
import useStore from './storeContext/store';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const {
    authenticated, handleLogout, handleLogin, data, updateUser
  } = useStore();
  return (
    <TransactionContext.Provider value={{authenticated, handleLogout, handleLogin, user: data.user, updateUser }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction( ){
  const context = useContext(TransactionContext);
  return context;
}