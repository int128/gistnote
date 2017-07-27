import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EditingGist from '../../../models/EditingGist';

import GistMetadata from './GistMetadata';
import LoadingIndicator from '../../LoadingIndicator';

const GistEditor = ({
  editingGist,
  changeEditingGist,
  updateGist,
  updating,
}) => (
  <div>
    <GistDescription disabled={updating}
      editingGist={editingGist}
      changeEditingGist={changeEditingGist}/>
    <GistMetadata gist={editingGist.gist}/>
    {editingGist.files.map(file =>
      <GistFile key={file.id} file={file}
        disabled={updating}
        onChange={file => changeEditingGist(editingGist.setFile(file))}/>
    ).toList()}
    <form className="gn-gist-edit-form">
      <div className="pull-left">
        <button type="button" className="btn btn-link"
          disabled={updating}
          onClick={e => changeEditingGist(editingGist.addNewFile())}>
          <span className="glyphicon glyphicon-plus-sign"></span>
          &nbsp;
          Add File
        </button>
      </div>
      <div className="pull-right">
        {updating ? <LoadingIndicator/> : null}
        &nbsp;
        <button type="button" className="btn btn-primary"
          disabled={updating}
          onClick={() => updateGist(editingGist.gist.id, editingGist.toGitHubRequest())}>
          Update Gist
        </button>
        &nbsp;
        <Link to={`/${editingGist.gist.id}`} className="btn btn-default"
          disabled={updating}>
          Cancel
        </Link>
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
    placeholder={editingGist.gist.id}
    value={editingGist.description}
    onChange={e => changeEditingGist(editingGist.setDescription(e.target.value))}/>
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
