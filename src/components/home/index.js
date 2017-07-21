import React from 'react';

import GistListContainer from './list/GistListContainer';
import GistContainer from './main/GistContainer';
import UserContainer from './bar/UserContainer';

export default () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 gn-gists">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Gistnote</a>
            </div>
          </div>
        </nav>
        <GistListContainer/>
      </div>
      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
        <div className="pull-right">
          <UserContainer/>
        </div>
        <GistContainer/>
      </div>
    </div>
  </div>
)
