import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GistList = ({gists}) => (
  <div>
    {gists.map(gist => <GistListItem gist={gist} key={gist.id}/>)}
    <a href="#more" className="list-group-item">
      <span className="glyphicon glyphicon-chevron-down"></span> more...
    </a>
  </div>
)

GistList.propTypes = {
  gists: PropTypes.array.isRequired,
}

export default GistList

const GistListItem = ({gist}) => (
  <Link to={`/${gist.id}`} className="list-group-item gn-gists-list-item">
    <div className="gn-gists-list-item-title">{gist.description || gist.id}</div>
    <div className="gn-gists-list-item-updated pull-left">{gist.updated_at}</div>
    <div className="gn-gists-list-item-icons pull-right">
      {gist.public ? null : (
        <span className="glyphicon glyphicon-lock"></span>
      )}
    </div>
    <div className="clearfix"></div>
  </Link>
);
