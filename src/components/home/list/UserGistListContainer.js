import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import { fetchUserGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';

class UserGistListContainer extends React.Component {
  static propTypes = {
    userResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
    gistsResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
    gistContentResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchUserGists();
  }

  render() {
    return (
      <div>
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#public-gists" onClick={null}>User Gists</a>
          </li>
        </ul>
        <div className="list-group gn-gists-list">
          {this.renderList()}
        </div>
      </div>
    );
  }

  renderList() {
    const { gistsResponse, gistContentResponse } = this.props;
    switch (gistsResponse.state) {
      case LOADING:
        return <li className="list-group-item"><LoadingIndicator/></li>;
      case RESOLVED:
        return <GistList gists={gistsResponse.data} activeGist={gistContentResponse.data}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  gistsResponse: state.gistsResponse,
  gistContentResponse: state.gistContentResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserGistListContainer);
