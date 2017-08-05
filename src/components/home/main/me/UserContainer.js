import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../../infrastructure/PromiseState';

import { readUserProfile } from '../../../../state/user/actionCreators';

import LoadingIndicator from '../../../LoadingIndicator';

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
  <div className="text-center">
    <div className="jumbotron text-center">
      <img className="img-circle" src={userProfile.avatar_url}
        width="128" height="128" alt="avatar"/>
      <h1>{userProfile.name}</h1>
      <p>{userProfile.bio}</p>
      <p>@{userProfile.login}</p>
      <div>
        <span className="label label-primary">{userProfile.location}</span>
        &nbsp;
        <span className="label label-primary">{userProfile.public_gists} Public Gists</span>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  readUserProfile,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
