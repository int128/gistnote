import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NewGistCotainer from './NewGistCotainer';
import GistViewContainer from './GistViewContainer';
import GistEditorContainer from './GistEditorContainer';
import Top from './Top';

export default () => (
  <Switch>
    <Route exact path="/new" component={NewGistCotainer}/>
    <Route path="/:id/edit" component={GistEditorContainer}/>
    <Route path="/:id" component={GistViewContainer}/>
    <Route component={Top}/>
  </Switch>
)
