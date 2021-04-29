import React from 'react';
import ReactDOM from 'react-dom';
import { TransactionProvider } from './hooks/useTransaction';

import App from './App';

ReactDOM.render(
    <TransactionProvider>
      <App />
    </TransactionProvider>,
document.querySelector('#root'));
