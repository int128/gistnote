import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import { fetchMyGists } from '../../../state/gists/actionCreators';

import GistList from './GistList';
import LoadingIndicator from '../../LoadingIndicator';

class MyGistListContainer extends React.Component {
  static propTypes = {
    gistsResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
    gistContentResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchMyGists();
  }

  render() {
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
  fetchMyGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyGistListContainer);
