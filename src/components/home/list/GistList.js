import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GistList = ({gists, activeGist}) => (
  <div>
    {gists.map(gist => (
      <GistListItem
        key={gist.id}
        gist={gist}
        active={activeGist !== null && gist.id === activeGist.id}/>
    ))}
    <a href="#more" className="list-group-item">
      <span className="glyphicon glyphicon-chevron-down"></span> more...
    </a>
  </div>
)

GistList.propTypes = {
  gists: PropTypes.array.isRequired,
  activeGist: PropTypes.object,
}

export default GistList

const GistListItem = ({gist, active}) => (
  <Link to={`/${gist.id}`} className={`list-group-item gn-gists-list-item ${active ? 'gn-gists-list-item-active' : ''}`}>
    <div className="gn-gists-list-item-title">{gist.description || gist.id}</div>
    <div className="gn-gists-list-item-updated pull-left">{gist.updated_at}</div>
    <div className="gn-gists-list-item-icons pull-right">
      {gist.public ? null : (
        <span className="glyphicon glyphicon-lock"></span>
      )}
    </div>
    <div className="clearfix"></div>
  </Link>
)

GistListItem.propTypes = {
  gist: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
}
