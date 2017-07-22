import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Seq } from 'immutable';

const GistContent = ({gist}) => (
  <div>
    <div className="page-header"><h2>{gist.description || gist.id}</h2></div>
    <GistMetadata gist={gist}/>
    <GistNavigation gist={gist}/>
    <div className="clearfix"></div>
    {Seq(gist.files).map((file, key) => <GistFile key={key} file={file}/>).toList()}
  </div>
)

GistContent.propTypes = {
  gist: PropTypes.object.isRequired,
}

export default GistContent

const GistMetadata = ({gist}) => (
  <ul className="list-inline pull-left">
    <li>
      {gist.owner ? (
        <a href={gist.owner.html_url} target="_blank">
          <span className="glyphicon glyphicon-user"></span>&nbsp;{gist.owner.login}
        </a>
      ) : (
        <span><span className="glyphicon glyphicon-user"></span>&nbsp;Anonymous</span>
      )}
    </li>
    <li>
      <span className="glyphicon glyphicon-time"></span>
      &nbsp;
      Created <time dateTime={gist.created_at} title={gist.created_at}>{gist.created_at}</time>
    </li>
    <li>
      <span className="glyphicon glyphicon-time"></span>
      &nbsp;
      Updated <time dateTime={gist.updated_at} title={gist.updated_at}>{gist.updated_at}</time>
    </li>
    <li>
      <a href={gist.html_url} target="_blank">
        <span className="glyphicon glyphicon-link"></span>&nbsp;Gist
      </a>
    </li>
    {gist.public ? null : (
      <li className="text-danger">
        <span className="glyphicon glyphicon-lock"></span>&nbsp;Private
      </li>
    )}
  </ul>
)

const GistNavigation = ({gist}) => (
  <ul className="nav nav-pills pull-right">
    <li>
      <Link to={`/slide/${gist.id}`}>
        <span className="glyphicon glyphicon-film"></span>&nbsp;Slideshow
      </Link>
    </li>
    <li>
      <Link to={`/${gist.id}/edit`}>
        <span className="glyphicon glyphicon-edit"></span>&nbsp;Edit
      </Link>
    </li>
  </ul>
)

const GistFile = ({file}) => (
  <div>
    <h3>{file.filename}</h3>
    <span className="label label-primary">{file.language}</span>
    {file.language === 'Markdown' ? (
      <Markdown content={file.content}/>
    ) : (
      <Highlight content={file.content}/>
    )}
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
