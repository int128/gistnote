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
    fetchedGists: PropTypes.instanceOf(PromiseResponse).isRequired,
    fetchedGist: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchPublicGists();
  }

  render() {
    const { fetchedGists, fetchedGist } = this.props;
    switch (fetchedGists.state) {
      case RESOLVED:
        return <GistList gists={fetchedGists.data} activeGist={fetchedGist.data}/>;
      default:
        return <li className="list-group-item"><LoadingIndicator/></li>;
    }
  }
}

const mapStateToProps = state => ({
  fetchedGists: state.fetchedGists,
  fetchedGist: state.fetchedGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPublicGists,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PublicGistListContainer);
