import React,{lazy, Suspense, useState, useEffect, useCallback} from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

import './styles/global.css';

import { useTransaction } from './hooks/useTransaction';
import Progress from './components/Progress';
import Header from './components/Header';
import Footer from './components/Footer';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
  const { authenticated, handleLogin } = useTransaction();
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!authenticated) {
      setIsSignedUp(false);
    }
  }, [authenticated]);

  const handleSignIn = useCallback(() => {
    handleLogin();
    history.push('/dashboard');
  }, []);

  return  (
      <Router history={history}> 
        <StylesProvider generateClassName={generateClassName}>
          <Header />
          <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy  onSignIn={handleSignIn}/>
            </Route>
            <Route path="/dashboard">
              {!authenticated && !isSignedUp && <Redirect to="/"/>}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy}/>
          </Switch>
          </Suspense>
          <Footer />
        </StylesProvider>
     </Router>
  )
}