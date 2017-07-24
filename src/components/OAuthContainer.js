import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchAccessToken } from '../state/user/actionCreators';

import LoadingIndicator from './LoadingIndicator';

class OAuthContainer extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const [, code, state] = this.props.location.search.match(/\?code=(.+)&state=(.+)/);
    this.props.fetchAccessToken(code, state);
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h2><LoadingIndicator/>&nbsp;Authorization in Progress</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAccessToken,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OAuthContainer);
