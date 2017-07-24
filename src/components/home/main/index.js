import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GistContentContainer from './GistContentContainer';
import GistEditorContainer from './GistEditorContainer';
import Top from './Top';

export default () => (
  <Switch>
    <Route path="/:id/edit" component={GistEditorContainer}/>
    <Route path="/:id" component={GistContentContainer}/>
    <Route component={Top}/>
  </Switch>
)
