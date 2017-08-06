import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { handleOAuthRedirect } from '../state/oauth/actionCreators';

import LoadingIndicator from './LoadingIndicator';

class OAuthContainer extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.handleOAuthRedirect();
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
  handleOAuthRedirect,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OAuthContainer);
