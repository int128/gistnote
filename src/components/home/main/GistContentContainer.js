import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import { fetchGistContent } from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import GistContent from './GistContent';
import LoadingIndicator from '../../LoadingIndicator';

class GistContentContainer extends React.Component {
  static propTypes = {
    gistContentResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.fetchGistContent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!is(Seq(this.props.match.params), Seq(prevProps.match.params))) {
      this.props.fetchGistContent(this.props.match.params.id);
    }
  }

  render() {
    const { gistContentResponse } = this.props;
    switch (gistContentResponse.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <GistContent gist={gistContentResponse.data}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  gistContentResponse: state.gistContentResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGistContent,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GistContentContainer);
