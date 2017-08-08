import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../infrastructure/PromiseState';

import UserContainer from './UserContainer';
import LoginContainer from './LoginContainer';

class BarContainer extends React.Component {
  static propTypes = {
    session: PropTypes.instanceOf(PromiseState).isRequired,
  }

  render() {
    return this.props.session.mapIf({
      invalid: () => <LoginContainer/>,
      rejected: () => <LoginContainer/>,
      resolved: () => <UserContainer/>,
    });
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BarContainer);
