import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PromiseState from '../../../infrastructure/PromiseState';

import {
  newEditingGist,
  invalidateGist,
  changeEditingGist,
  createGist,
} from '../../../state/gists/actionCreators';

import GistEditor from './GistEditor';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

class NewGistContainer extends React.Component {
  static propTypes = {
    editingGist: PropTypes.instanceOf(PromiseState).isRequired,
    createdGist: PropTypes.instanceOf(PromiseState).isRequired,
  }

  componentDidMount() {
    this.props.newEditingGist();
  }

  componentWillUnmount() {
    this.props.invalidateGist();
  }

  render() {
    const {
      editingGist,
      createdGist,
      changeEditingGist,
      createGist,
    } = this.props;
    switch (editingGist.state) {
      case PromiseState.stateTypes.LOADING:
        return <LoadingIndicator/>;
      case PromiseState.stateTypes.RESOLVED:
        return <GistEditor
          editingGist={editingGist.payload}
          changeEditingGist={changeEditingGist}
          disabled={createdGist.isLoading()}
          error={createdGist.isRejected() ? createdGist.payload : null}
          form={
            <span>
              {createdGist.isLoading() ? <LoadingIndicator/> : null}
              &nbsp;
              <button type="button" className="btn btn-primary"
                disabled={createdGist.isLoading()}
                onClick={() => createGist(editingGist.payload.setAsPrivate())}>
                Create Private Gist
              </button>
              &nbsp;
              <button type="button" className="btn btn-info"
                disabled={createdGist.isLoading()}
                onClick={() => createGist(editingGist.payload.setAsPublic())}>
                Create Public Gist
              </button>
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
  createdGist: state.createdGist,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  newEditingGist,
  invalidateGist,
  changeEditingGist,
  createGist,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewGistContainer);
