import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../infrastructure/PromiseState';

import AuthenticatedContainer from './AuthenticatedContainer';
import NotAuthenticated from './NotAuthenticated';

class ListContainer extends React.Component {
  static propTypes = {
    session: PropTypes.instanceOf(PromiseState).isRequired,
  }

  render() {
    return this.props.session.mapIf({
      invalid: () => <NotAuthenticated/>,
      rejected: () => <NotAuthenticated/>,
      resolved: () => <AuthenticatedContainer/>,
    });
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
