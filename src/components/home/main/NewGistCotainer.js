import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  createEditingGist,
  changeEditingGist,
  destroyEditingGist,
  createGist,
  destroyCreatedGist,
} from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED } from '../../../models/PromiseResponse';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';

class NewGistContainer extends React.Component {
  static propTypes = {
    editingGist: PropTypes.instanceOf(PromiseResponse).isRequired,
    createdGist: PropTypes.instanceOf(PromiseResponse).isRequired,
  }

  componentDidMount() {
    this.props.createEditingGist();
  }

  componentWillUnmount() {
    this.props.destroyEditingGist();
    this.props.destroyCreatedGist();
  }

  render() {
    const {
      editingGist,
      createdGist,
      changeEditingGist,
      createGist,
    } = this.props;
    switch (editingGist.state) {
      case LOADING:
        return <LoadingIndicator/>;
      case RESOLVED:
        return <GistEditor
          editingGist={editingGist.data}
          changeEditingGist={changeEditingGist}
          updateGist={createGist}
          updating={createdGist.state === LOADING}/>;
      default:
        return null;
    }
  }
}

const mapStateToProps = state => ({
  editingGist: state.editingGist,
  createdGist: state.createdGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createEditingGist,
  changeEditingGist,
  destroyEditingGist,
  createGist,
  destroyCreatedGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewGistContainer);
