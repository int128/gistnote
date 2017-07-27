import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NewGistCotainer from './NewGistCotainer';
import ViewGistContainer from './ViewGistContainer';
import EditGistContainer from './EditGistContainer';
import Top from './Top';

export default () => (
  <Switch>
    <Route exact path="/new" component={NewGistCotainer}/>
    <Route path="/:id/edit" component={EditGistContainer}/>
    <Route path="/:id" component={ViewGistContainer}/>
    <Route component={Top}/>
  </Switch>
)
