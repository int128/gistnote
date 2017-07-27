import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import { fetchGist, destroyFetchedGist } from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import GistView from './GistView';
import LoadingIndicator from '../../LoadingIndicator';

class GistViewContainer extends React.Component {
  static propTypes = {
    fetchedGist: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchGist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!is(Seq(this.props.match.params), Seq(prevProps.match.params))) {
      this.props.fetchGist(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.destroyFetchedGist();
  }

  render() {
    const { fetchedGist } = this.props;
    switch (fetchedGist.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <GistView gist={fetchedGist.data}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  fetchedGist: state.fetchedGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGist,
  destroyFetchedGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GistViewContainer);
