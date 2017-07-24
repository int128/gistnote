import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PromiseResponse, { RESOLVED } from '../../../models/PromiseResponse';

import { fetchPublicGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';

class PublicGistListContainer extends React.Component {
  static propTypes = {
    gistsResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
    gistContentResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchPublicGists();
  }

  render() {
    return (
      <div>
        <ul className="nav nav-pills">
          <li className="active">
            <a href="#public-gists" onClick={null}>Public Gists</a>
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
      case RESOLVED:
        return <GistList gists={gistsResponse.data} activeGist={gistContentResponse.data}/>;
      default:
        return <li className="list-group-item"><LoadingIndicator/></li>;
    }
  }
}

const mapStateToProps = state => ({
  gistsResponse: state.gistsResponse,
  gistContentResponse: state.gistContentResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPublicGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistListContainer);
