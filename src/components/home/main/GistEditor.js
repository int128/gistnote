import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Seq } from 'immutable';

import GistMetadata from './GistMetadata';

const GistEditor = ({gist}) => (
  <div>
    <input type="text" className="form-control input-lg h2"
      placeholder={`gist:${gist.id}`} defaultValue={gist.description}/>
    <GistMetadata gist={gist}/>
    <div className="clearfix"></div>
    {Seq(gist.files).map((file, key) => <GistFile key={key} file={file}/>).toList()}
    <form className="gn-gist-edit-form">
      <div className="pull-left">
        <button type="button" className="btn btn-link">
          <span className="glyphicon glyphicon-plus-sign"></span>
          &nbsp;
          Add File
        </button>
      </div>
      <div className="pull-right">
        <button type="button" className="btn btn-primary">Update Gist</button>
        &nbsp;
        <Link to={`/${gist.id}`} className="btn btn-default">Cancel</Link>
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
  gist: PropTypes.object.isRequired,
}

export default GistEditor

const GistFile = ({file}) => (
  <div>
    <h3>
      {file.filename}
      <button type="button" className="btn btn-link" v-on="click: state = 'removed'" v-if="state != 'removed'">
        <span className="glyphicon glyphicon-remove"></span> Mark as Removed
      </button>
    </h3>
    <div className="panel panel-default">
      <div className="panel-heading" v-if="state == 'new'">
        <div className="row">
          <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11">
            <input type="text" className="form-control" placeholder="Filename" value={file.filename}/>
          </div>
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
            <button type="button" className="close" v-on="click: removeGistFile(filename)">&times;</button>
          </div>
        </div>
      </div>
      <div className="panel-body text-danger" v-if="state == 'removed'">
        <span className="glyphicon glyphicon-remove"></span> To be removed.
        <a href="javascript:void(0)" v-on="click: state = 'loaded'">Cancel</a>
      </div>
      <div className="panel-body" v-if="state != 'removed'">
        <div className="container-fluid">
          <div className="row autosize-textarea">
            <textarea className="form-control" value={file.content}></textarea>
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
