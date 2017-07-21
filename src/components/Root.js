import React from 'react';
import { Route } from 'react-router-dom';
import Home from './home';
import Slide from './slide';
import About from './about';

export default () => (
  <div>
    <Route exact path="/" component={Home}/>
    <Route exact path="/slide" component={Slide}/>
    <Route exact path="/about" component={About}/>
  </div>
)
