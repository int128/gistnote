import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import { fetchGist, destroyFetchedGist } from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED, REJECTED } from '../../../models/PromiseResponse';

import GistView from './GistView';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class ViewGistContainer extends React.Component {
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
        return (
          <div className="page-header">
            <h2><LoadingIndicator/></h2>
          </div>
        );
      case RESOLVED:
        return <GistView gist={fetchedGist.data}/>;
      case REJECTED:
        return <ErrorIndicator error={fetchedGist.error}/>;
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewGistContainer);
