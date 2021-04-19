import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {StylesProvider, createGenerateClassName} from '@material-ui/core/styles';

import Loading from './components/Landing';
import Pricing from './components/Pricing';

const generateClassName = createGenerateClassName({
  productionPrefix: 'ma'
});

export default () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
        <Switch>
          <Route exact path="/pricing" component={Pricing}/>
          <Route  path="/" component={Loading}/>
        </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}




