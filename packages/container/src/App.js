import React,{lazy, Suspense, useState, useEffect, useCallback, useContext} from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import {createBrowserHistory} from 'history';

import Progress from './components/Progress';
import Header from './components/Header';

import { Context } from './ContextApi/AuthContext';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));


const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const history = createBrowserHistory();

export default () => {
  const { authenticated, handleLogin } = useContext(Context);
  const [isSignedUp, setIsSignedUp] = useState(true);

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
          <div>
          <Header />
          <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthLazy onSignIn={handleSignIn} />
            </Route>
            <Route path="/dashboard">
              {!authenticated && !isSignedUp && <Redirect to="/"/>}
              <DashboardLazy />
            </Route>
            <Route path="/" component={MarketingLazy}/>
          </Switch>
          </Suspense>
        </div>
        </StylesProvider>
     </Router>
  )
}