import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Gists from '../../../models/Gists';

import LoadingIndicator from '../../LoadingIndicator';

const GistList = ({gists}) => (
  <div className="list-group gn-gists-list">
    {gists.loading ? (
      <li className="list-group-item"><LoadingIndicator/></li>
    ) : (
      <div>
        {gists.array.map(gist => <GistListItem gist={gist} key={gist.id}/>)}
        <a href="#more" className="list-group-item">
          <span className="glyphicon glyphicon-chevron-down"></span> more...
        </a>
      </div>
    )}
  </div>
)

GistList.propTypes = {
  gists: PropTypes.instanceOf(Gists).isRequired,
};

const GistListItem = ({gist}) => (
  <Link to={`/${gist.id}`} className="list-group-item gn-gists-list-item">
    <div className="gn-gists-list-item-title">{gist.title}</div>
    <div className="gn-gists-list-item-updated pull-left">{gist.updated_at}</div>
    <div className="gn-gists-list-item-icons pull-right">
      <span className="glyphicon glyphicon-lock"></span>
    </div>
    <div className="clearfix"></div>
  </Link>
);

export default GistList;
