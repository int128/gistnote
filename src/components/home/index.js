import React from 'react';
import { Link } from 'react-router-dom';

import ListContainer from './list';
import MainContainer from './main';
import BarContainer from './bar';

export default () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 gn-gists">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Gistnote</Link>
            </div>
          </div>
        </nav>
        <ListContainer/>
      </div>
      <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2">
        <div className="pull-right">
          <BarContainer/>
        </div>
        <MainContainer/>
      </div>
    </div>
  </div>
)
