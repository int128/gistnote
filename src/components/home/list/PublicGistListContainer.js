import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import GistsResponse from '../../../models/GistsResponse';
import { RESOLVED } from '../../../models/PromiseResponse';

import { fetchPublicGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';

class PublicGistListContainer extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object,
    gistsResponse: PropTypes.instanceOf(GistsResponse).isRequired,
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
    const { gistsResponse } = this.props;
    switch (gistsResponse.state) {
      case RESOLVED:
        return <GistList gists={gistsResponse.data}/>;
      default:
        return <li className="list-group-item"><LoadingIndicator/></li>;
    }
  }
}

const mapStateToProps = state => ({
  gistsResponse: state.gistsResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPublicGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistListContainer);
