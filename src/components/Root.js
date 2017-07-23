import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Slide from './slide';
import About from './about';
import OAuthContainer from './OAuthContainer';

export default () => (
  <Switch>
    <Route exact path="/oauth" component={OAuthContainer}/>
    <Route exact path="/slide" component={Slide}/>
    <Route exact path="/about" component={About}/>
    <Route component={Home}/>
  </Switch>
)
