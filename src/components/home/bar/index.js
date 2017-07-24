import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserContainer from './UserContainer';
import LoginContainer from './LoginContainer';

class BarContainer extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.authenticated) {
      return <UserContainer/>;
    } else {
      return <LoginContainer/>;
    }
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
