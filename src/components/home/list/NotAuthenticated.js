import React from 'react';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';

import PublicGistListContainer from './PublicGistListContainer';

export default () => (
  <div>
    <ul className="nav nav-pills">
      <li className="active">
        <a href="#public-gists" onClick={preventDefaultEvent()}>Public Gists</a>
      </li>
    </ul>
    <div className="list-group gn-gists-list">
      <PublicGistListContainer/>
    </div>
  </div>
)
