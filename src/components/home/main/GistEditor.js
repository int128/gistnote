import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EditingGist from '../../../models/EditingGist';
import { LOADING, REJECTED } from '../../../models/PromiseResponse';

import GistMetadata from './GistMetadata';
import LoadingIndicator from '../../LoadingIndicator';
import ErrorIndicator from '../../ErrorIndicator';

const GistEditor = ({
  editingGist,
  changeEditingGist,
  action,
  actionResponse,
  actionInProgress = actionResponse.state === LOADING,
}) => (
  <div>
    <GistDescription disabled={actionInProgress}
      editingGist={editingGist}
      changeEditingGist={changeEditingGist}/>
    {editingGist.originalGist ? (
      <GistMetadata gist={editingGist.originalGist}/>
    ) : null}
    {editingGist.files.map(file =>
      <GistFile key={file.id} file={file}
        disabled={actionInProgress}
        onChange={file => changeEditingGist(editingGist.setFile(file))}/>
    ).toList()}
    {actionResponse.state === REJECTED ? <ErrorIndicator error={actionResponse.error}/> : null}
    <form className="gn-gist-edit-form">
      <div className="pull-left">
        <button type="button" className="btn btn-link"
          disabled={actionInProgress}
          onClick={e => changeEditingGist(editingGist.addNewFile())}>
          <span className="glyphicon glyphicon-plus-sign"></span>
          &nbsp;
          Add File
        </button>
      </div>
      <div className="pull-right">
        {actionInProgress ? <LoadingIndicator/> : null}
        &nbsp;
        {editingGist.originalGist ? (
          <UpdateForm
            id={editingGist.originalGist.id}
            action={() => action(editingGist.originalGist.id, editingGist.toGitHubRequest())}
            actionInProgress={actionInProgress}/>
        ) : (
          <CreateForm
            action={overrides => action(editingGist.toGitHubRequest(overrides))}
            actionInProgress={actionInProgress}/>
        )}
      </div>
      <div className="clearfix"></div>
    </form>
    <div className="well">
      <strong>Tips for Slideshow:</strong>
      &nbsp;
      Split slide pages by <code>---</code> separator.
    </div>
  </div>
)

GistEditor.propTypes = {
  editingGist: PropTypes.instanceOf(EditingGist).isRequired,
}

export default GistEditor

const GistDescription = ({disabled, editingGist, changeEditingGist}) => (
  <input type="text" className="form-control input-lg h2"
    disabled={disabled}
    placeholder={editingGist.originalGist ? editingGist.originalGist.id : 'Description'}
    value={editingGist.description}
    onChange={e => changeEditingGist(editingGist.setDescription(e.target.value))}/>
)

const CreateForm = ({action, actionInProgress}) => (
  <span>
    <button type="button" className="btn btn-primary"
      disabled={actionInProgress}
      onClick={() => action({public: false})}>
      Create Private Gist
    </button>
    &nbsp;
    <button type="button" className="btn btn-info"
      disabled={actionInProgress}
      onClick={() => action({public: true})}>
      Create Public Gist
    </button>
  </span>
)

const UpdateForm = ({id, action, actionInProgress}) => (
  <span>
    <button type="button" className="btn btn-primary"
      disabled={actionInProgress}
      onClick={action}>
      Update Gist
    </button>
    &nbsp;
    <Link to={`/${id}`} className="btn btn-default" disabled={actionInProgress}>
      Cancel
    </Link>
  </span>
)

const GistFile = ({file, onChange, disabled}) => (
  <div>
    <h3>{file.originalFilename}</h3>
    {file.remove ? (
      <ToBeRemoved file={file} onChange={onChange}/>
    ) : (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="row">
            <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
              <input type="text" className="form-control" placeholder="Filename"
                disabled={disabled}
                value={file.filename}
                onChange={e => onChange(file.renameTo(e.target.value))}/>
            </div>
            <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              <button type="button" className="close"
                disabled={disabled}
                onClick={() => onChange(file.toggleRemove())}>
                <span className="glyphicon glyphicon-remove"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="container-fluid">
            <div className="row autosize-textarea">
              <textarea className="form-control"
                disabled={disabled}
                value={file.content}
                onChange={e => onChange(file.setContent(e.target.value))}></textarea>
              <div className="col-sm-6 col-md-6 col-lg-6 col-sm-offset-6 col-md-offset-6 col-lg-offset-6">
                {file.language === 'Markdown' ? (
                  <Markdown content={file.content}/>
                ) : (
                  <Highlight content={file.content}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)

const ToBeRemoved = ({file, onChange}) => (
  <div className="panel panel-default">
    <div className="panel-body text-danger">
      <span className="glyphicon glyphicon-remove"></span> To be removed.
      &nbsp;
      <a href="#cancel" onClick={() => onChange(file.toggleRemove())}>Cancel</a>
    </div>
  </div>
)

//TODO
const Markdown = ({content}) => (
  <div className="panel panel-default">
    <div className="panel-body">
      {content}
    </div>
  </div>
)

//TODO
const Highlight = ({content}) => (
  <pre>
    <code>{content}</code>
  </pre>
)
