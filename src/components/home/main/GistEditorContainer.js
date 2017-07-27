import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import {
  fetchGistContent,
  destroyGistContent,
  changeEditingGistContent,
  updateGistContent,
} from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';

class GistEditorContainer extends React.Component {
  static propTypes = {
    editingGistContent: PropTypes.instanceOf(PromiseResponse).isRequired,
    updateGistContentResponse: PropTypes.instanceOf(PromiseResponse).isRequired,
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
    const {
      editingGistContent,
      updateGistContentResponse,
      changeEditingGistContent,
      updateGistContent,
    } = this.props;
    switch (editingGistContent.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <GistEditor editingGistContent={editingGistContent.data}
          changeEditingGistContent={changeEditingGistContent}
          updateGistContent={updateGistContent}
          updating={updateGistContentResponse.state === LOADING}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  editingGistContent: state.editingGistContent,
  updateGistContentResponse: state.updateGistContentResponse,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGistContent,
  destroyGistContent,
  changeEditingGistContent,
  updateGistContent,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GistEditorContainer);
