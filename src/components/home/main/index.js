import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NewGistCotainer from './NewGistCotainer';
import ViewGistContainer from './ViewGistContainer';
import EditGistContainer from './EditGistContainer';
import TopContainer from './TopContainer';

export default () => (
  <Switch>
    <Route exact path="/new" component={NewGistCotainer}/>
    <Route exact path="/:id/edit" component={EditGistContainer}/>
    <Route exact path="/:id" component={ViewGistContainer}/>
    <Route component={TopContainer}/>
  </Switch>
)
