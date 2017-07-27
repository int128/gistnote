import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import {
  createEditingGistContent,
  changeEditingGistContent,
  destroyEditingGistContent,
  requestCreateGist,
} from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import GistEditor from './GistEditor';

class NewGistContainer extends React.Component {
  static propTypes = {
    editingGistContent: PropTypes.instanceOf(PromiseResponse).isRequired,
    responseCreateGist: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.createEditingGistContent();
  }

  componentWillUnmount() {
    this.props.destroyEditingGistContent();
  }

  render() {
    const {
      editingGistContent,
      responseCreateGist,
      changeEditingGistContent,
      updateGistContent,
    } = this.props;
    return <GistEditor editingGistContent={editingGistContent.data}
      changeEditingGistContent={changeEditingGistContent}
      updateGistContent={updateGistContent}
      updating={responseCreateGist.state === LOADING}/>;
  }
}

const mapStateToProps = state => ({
  editingGistContent: state.editingGistContent,
  responseCreateGist: state.responseCreateGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createEditingGistContent,
  changeEditingGistContent,
  destroyEditingGistContent,
  sendCreateGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewGistContainer);
