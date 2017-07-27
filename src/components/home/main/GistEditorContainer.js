import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import {
  fetchGist,
  destroyFetchedGist,
  changeEditingGist,
  updateGist,
} from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';

class GistEditorContainer extends React.Component {
  static propTypes = {
    editingGist: PropTypes.instanceOf(PromiseResponse).isRequired,
    updatedGist: PropTypes.instanceOf(PromiseResponse).isRequired,
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
    const {
      editingGist,
      updatedGist,
      changeEditingGist,
      updateGist,
    } = this.props;
    switch (editingGist.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <GistEditor
          editingGist={editingGist.data}
          changeEditingGist={changeEditingGist}
          updateGist={updateGist}
          updating={updatedGist.state === LOADING}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  editingGist: state.editingGist,
  updatedGist: state.updatedGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchGist,
  destroyFetchedGist,
  changeEditingGist,
  updateGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GistEditorContainer);
