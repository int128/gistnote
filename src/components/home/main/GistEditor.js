import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EditingGistContent from '../../../models/EditingGistContent';

import GistMetadata from './GistMetadata';
import LoadingIndicator from '../../LoadingIndicator';

const GistEditor = ({
  editingGistContent,
  changeEditingGistContent,
  updateGistContent,
  updating,
}) => (
  <div>
    <input type="text" className="form-control input-lg h2"
      disabled={updating}
      placeholder={editingGistContent.gist.id}
      value={editingGistContent.description}
      onChange={e => changeEditingGistContent(editingGistContent.setDescription(e.target.value))}/>
    <GistMetadata gist={editingGistContent.gist}/>
    <div className="clearfix"></div>
    {editingGistContent.files.map(file =>
      <GistFile key={file.id} file={file}
        disabled={updating}
        onChange={file => changeEditingGistContent(editingGistContent.setFile(file))}/>
    ).toList()}
    <form className="gn-gist-edit-form">
      <div className="pull-left">
        <button type="button" className="btn btn-link"
          disabled={updating}
          onClick={e => changeEditingGistContent(editingGistContent.addNewFile())}>
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
          onClick={() => updateGistContent(editingGistContent.gist.id, editingGistContent.toGitHubRequest())}>
          Update Gist
        </button>
        &nbsp;
        <Link to={`/${editingGistContent.gist.id}`} className="btn btn-default"
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
  editingGistContent: PropTypes.instanceOf(EditingGistContent).isRequired,
}

export default GistEditor

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
