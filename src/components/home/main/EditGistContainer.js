import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';

import {
  fetchGist,
  destroyEditingGist,
  changeEditingGist,
  updateGist,
  destroyUpdatedGist,
} from '../../../state/gists/actionCreators';

import PromiseResponse, { LOADING, RESOLVED, REJECTED } from '../../../models/PromiseResponse';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class EditGistContainer extends React.Component {
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
    this.props.destroyEditingGist();
    this.props.destroyUpdatedGist();
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
          action={updateGist}
          actionResponse={updatedGist}/>;
      case REJECTED:
        return <ErrorIndicator error={editingGist.error}/>;
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
  destroyEditingGist,
  changeEditingGist,
  updateGist,
  destroyUpdatedGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditGistContainer);
