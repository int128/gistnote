import React from 'react';
import PropTypes from 'prop-types';

const GistMetadata = ({gist}) => (
  <ul className="list-inline pull-left">
    <li>
      {gist.owner ? (
        <a href={gist.owner.html_url} target="_blank">
          <span className="glyphicon glyphicon-user"></span>&nbsp;{gist.owner.login}
        </a>
      ) : (
        <span><span className="glyphicon glyphicon-user"></span>&nbsp;Anonymous</span>
      )}
    </li>
    <li>
      <span className="glyphicon glyphicon-time"></span>
      &nbsp;
      Created <time dateTime={gist.created_at} title={gist.created_at}>{gist.created_at}</time>
    </li>
    <li>
      <span className="glyphicon glyphicon-time"></span>
      &nbsp;
      Updated <time dateTime={gist.updated_at} title={gist.updated_at}>{gist.updated_at}</time>
    </li>
    <li>
      <a href={gist.html_url} target="_blank">
        <span className="glyphicon glyphicon-link"></span>&nbsp;Gist
      </a>
    </li>
    {gist.public ? null : (
      <li className="text-danger">
        <span className="glyphicon glyphicon-lock"></span>&nbsp;Private
      </li>
    )}
  </ul>
)

GistMetadata.propTypes = {
  gist: PropTypes.object.isRequired,
}

export default GistMetadata
