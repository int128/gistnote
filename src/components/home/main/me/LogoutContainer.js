import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preventDefaultEvent } from '../../../../infrastructure/DispatchUtil';

import { logout } from '../../../../state/user/actionCreators';

class LogoutContainer extends React.Component {
  render() {
    return (
      <p className="text-center">
        <button className="btn btn-default" onClick={preventDefaultEvent(this.props.logout)}>
          <span className="glyphicon glyphicon-user"></span> Sign out
        </button>
      </p>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
