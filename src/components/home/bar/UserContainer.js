import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../infrastructure/PromiseState';

import { readUserProfile } from '../../../state/user/actionCreators';

import LoadingIndicator from '../../LoadingIndicator';

class UserContainer extends React.Component {
  static propTypes = {
    userProfile: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    this.props.readUserProfile();
  }

  render() {
    return this.props.userProfile.mapIf({
      loading: () => <LoadingIndicator/>,
      resolved: payload => <User userProfile={payload}/>,
    });
  }
}

const User = ({userProfile}) => (
  <ul className="nav nav-pills">
    <li>
      <a href="#user">
        {userProfile.name}
        <img className="gn-user-avatar" src={userProfile.avatar_url} alt="avatar"/>
      </a>
    </li>
  </ul>
);

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  readUserProfile,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
