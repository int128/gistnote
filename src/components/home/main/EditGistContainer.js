import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Seq, is } from 'immutable';
import { Link } from 'react-router-dom';
import PromiseState from '../../../infrastructure/PromiseState';

import {
  readGist,
  invalidateGist,
  changeEditingGist,
  updateGist,
} from '../../../state/gists/actionCreators';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class EditGistContainer extends React.Component {
  static propTypes = {
    editingGist: PropTypes.instanceOf(PromiseState).isRequired,
    updatedGist: PropTypes.instanceOf(PromiseState).isRequired,
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
    const {
      editingGist,
      updatedGist,
      changeEditingGist,
      updateGist,
    } = this.props;
    switch (editingGist.state) {
      case PromiseState.stateTypes.LOADING:
        return <LoadingIndicator/>;
      case PromiseState.stateTypes.RESOLVED:
        return <GistEditor
          editingGist={editingGist.payload}
          changeEditingGist={changeEditingGist}
          disabled={updatedGist.isLoading()}
          error={updatedGist.isRejected() ? updatedGist.payload : null}
          form={
            <span>
              {updatedGist.isLoading() ? <LoadingIndicator/> : null}
              &nbsp;
              <button type="button" className="btn btn-primary"
                disabled={updatedGist.isLoading()}
                onClick={() => updateGist(editingGist.payload)}>
                Update Gist
              </button>
              &nbsp;
              <Link to={`/${editingGist.payload.originalGist.id}`}
                className="btn btn-default" disabled={updatedGist.isLoading()}>
                Cancel
              </Link>
            </span>
          }/>;
      case PromiseState.stateTypes.REJECTED:
        return <ErrorIndicator error={editingGist.payload}/>;
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
  readGist,
  invalidateGist,
  changeEditingGist,
  updateGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditGistContainer);
