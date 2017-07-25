import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import { fetchGistContent, destroyGistContent } from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';
import EditingGistContent from '../../../models/EditingGistContent';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';

class GistEditorContainer extends React.Component {
  static propTypes = {
    gistContentResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
    editingGistContent: PropTypes.instanceOf(EditingGistContent),
  }

  componentDidMount() {
    this.props.fetchGistContent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!is(Seq(this.props.match.params), Seq(prevProps.match.params))) {
      this.props.fetchGistContent(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.destroyGistContent();
  }

  render() {
    const { gistContentResponse, editingGistContent } = this.props;
    switch (gistContentResponse.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <GistEditor gist={gistContentResponse.data} editingGistContent={editingGistContent}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  gistContentResponse: state.gistContentResponse,
  editingGistContent: state.editingGistContent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGistContent,
  destroyGistContent,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GistEditorContainer);
