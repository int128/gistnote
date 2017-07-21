import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Top from './Top';

class GistContainer extends React.Component {
  static propTypes = {}

  render() {
    const { gist } = this.props;
    if (gist) {
      return (
        <div>
          <div class="page-header"><h2>{gist.title}</h2></div>
          <div>
            <h3>filename</h3>
            <span class="label label-primary">language</span>
            <div class="panel panel-default">
              <div class="panel-body"></div>
            </div>
            <div>
              <pre><code></code></pre>
            </div>
          </div>
        </div>
      );
    } else {
      return <Top/>;
    }
  }
}

const mapStateToProps = state => ({
  gist: state.gist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GistContainer);
