import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';

import { login } from '../../../state/oauth/actionCreators';

class LoginContainer extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills">
        <li>
          <button className="btn btn-link" onClick={preventDefaultEvent(this.props.login)}>
            <span className="glyphicon glyphicon-user"></span> Sign in with GitHub
          </button>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
