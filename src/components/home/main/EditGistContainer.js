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
    return editingGist.mapIf({
      loading: () => <LoadingIndicator/>,
      rejected: payload => <ErrorIndicator error={payload}/>,
      resolved: payload =>
        <GistEditor
          editingGist={payload}
          changeEditingGist={changeEditingGist}
          disabled={updatedGist.isLoading()}
          error={updatedGist.mapIfRejected()}
          form={
            <span>
              {updatedGist.isLoading() ? <LoadingIndicator/> : null}
              &nbsp;
              <button type="button" className="btn btn-primary"
                disabled={updatedGist.isLoading()}
                onClick={() => updateGist(payload)}>
                Update Gist
              </button>
              &nbsp;
              <Link to={`/${payload.originalGist.id}`}
                className="btn btn-default" disabled={updatedGist.isLoading()}>
                Cancel
              </Link>
            </span>
          }/>,
    });
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
