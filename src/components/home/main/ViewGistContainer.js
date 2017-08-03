import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';
import PromiseState from '../../../infrastructure/PromiseState';

import { readGist, invalidateGist } from '../../../state/gists/actionCreators';

import GistView from './GistView';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class ViewGistContainer extends React.Component {
  static propTypes = {
    gist: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    this.props.readGist(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!is(Seq(this.props.match.params), Seq(prevProps.match.params))) {
      this.props.readGist(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.invalidateGist();
  }

  render() {
    const { gist } = this.props;
    switch (gist.state) {
      case PromiseState.stateTypes.LOADING:
        return <div className="page-header"><h2><LoadingIndicator/></h2></div>;
      case PromiseState.stateTypes.RESOLVED:
        return <GistView gist={gist.payload}/>;
      case PromiseState.stateTypes.REJECTED:
        return <ErrorIndicator error={gist.payload}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  gist: state.gist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  readGist,
  invalidateGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewGistContainer);
