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
        <div className="jumbotron text-center">
          <LoadingIndicator/>
          <p>Authorization in Progress</p>
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
