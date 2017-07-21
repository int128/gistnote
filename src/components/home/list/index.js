import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PublicGistListContainer from './PublicGistListContainer';

class ListContainer extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
  }

  render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return (
        <div>TODO</div>
      );
    } else {
      return <PublicGistListContainer/>;
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
