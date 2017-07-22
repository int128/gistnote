import React from 'react';
import PropTypes from 'prop-types';

const GistContent = ({gist}) => (
  <div>
    <div className="page-header"><h2>{gist.description}</h2></div>
    <div>
      <h3>filename</h3>
      <span className="label label-primary">language</span>
      <div className="panel panel-default">
        <div className="panel-body"></div>
      </div>
      <div>
        <pre><code></code></pre>
      </div>
    </div>
  </div>
)

GistContent.propTypes = {
  gist: PropTypes.object.isRequired,
}

export default GistContent
