import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Gists from '../../../models/Gists';

import { fetchPublicGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';

class PublicGistListContainer extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    gists: PropTypes.instanceOf(Gists).isRequired,
  }

  componentDidMount() {
    this.props.fetchPublicGists();
  }

  render() {
    const { gists } = this.props;
    return (
      <div>
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#public-gists" onClick={null}>Public Gists</a>
          </li>
        </ul>
        <GistList gists={gists}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gists: state.gists,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPublicGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistListContainer);
