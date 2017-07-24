import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { preventDefaultEvent } from '../../../infrastructure/DispatchUtil';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import { fetchUser, logout } from '../../../state/user/actionCreators';

import LoadingIndicator from '../../LoadingIndicator';

class UserContainer extends React.Component {
  static propTypes = {
    userResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { userResponse } = this.props;
    switch (userResponse.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <User user={userResponse.data} logout={this.props.logout}/>;
      default:
        return null;
    }
  }
}

const User = ({user, logout}) => (
  <ul className="nav nav-pills">
    <li className="dropdown">
      <a href="#user" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
        {user.name}
        <img className="gn-user-avatar" src={user.avatar_url} alt="avatar"/>
      </a>
      <ul className="dropdown-menu" role="menu">
        <li className="dropdown-header">@{user.login}</li>
        <li><a href={user.html_url}>Your Profile</a></li>
        <li><a href="#logout" onClick={preventDefaultEvent(logout)}>Logout</a></li>
        <li className="divider"></li>
        <li className="dropdown-header">Gistnote</li>
        <li><a href="https://github.com/gistnote/gistnote.github.io">Send Feedback</a></li>
      </ul>
    </li>
  </ul>
);

const mapStateToProps = state => ({
  userResponse: state.userResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUser,
  logout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
