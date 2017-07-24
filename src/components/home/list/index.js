import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PublicGistListContainer from './PublicGistListContainer';
import UserGistListContainer from './UserGistListContainer';

class ListContainer extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
  }

  render() {
    if (this.props.authenticated) {
      return <UserGistListContainer/>;
    } else {
      return <PublicGistListContainer/>;
    }
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
