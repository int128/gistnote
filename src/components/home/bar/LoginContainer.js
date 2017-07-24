import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';

import { login } from '../../../state/user/actionCreators';

class LoginContainer extends React.Component {
  render() {
    return (
      <ul className="nav nav-pills">
        <li>
          <a href="#login" onClick={preventDefaultEvent(this.props.login)}>
            <span className="glyphicon glyphicon-user"></span> Sign in with GitHub
          </a>
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
