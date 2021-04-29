import React from 'react';
import {Switch, Route, Router} from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import Signin from './components/Signin';
import Signup from './components/Signup';
import {Container} from './components/SignIn/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'au'
});

export default ({ history, onSignIn, data}: any) => {
  return (
    <Container>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} data={data}/>
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </Container>
  )
}




