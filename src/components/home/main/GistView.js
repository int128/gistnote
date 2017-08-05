import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Seq } from 'immutable';
import remark from 'remark';
import remarkReact from 'remark-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles';
import lowlight from 'lowlight';

import GistMetadata from './GistMetadata';

const GistContent = ({gist}) => (
  <div>
    <div className="page-header"><h2>{gist.description || gist.id}</h2></div>
    <div className="pull-left">
      <GistMetadata gist={gist}/>
    </div>
    <div className="pull-right">
      <GistNavigation gist={gist}/>
    </div>
    <div className="clearfix"></div>
    {Seq(gist.files).map((file, key) => <GistFile key={key} file={file}/>).toList()}
  </div>
)

GistContent.propTypes = {
  gist: PropTypes.object.isRequired,
}

export default GistContent

const GistNavigation = ({gist}) => (
  <ul className="nav nav-pills">
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
      <Highlight content={file.content} language={file.language}/>
    )}
  </div>
)

const Markdown = ({content}) => (
  <div className="panel panel-default">
    <div className="panel-body">
      {remark().use(remarkReact).processSync(content).contents}
    </div>
  </div>
)

const Highlight = ({content, language}) => {
  let effectiveLanguage;
  if (language && lowlight.getLanguage(language)) {
    effectiveLanguage = language;
  }
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <SyntaxHighlighter language={effectiveLanguage} style={githubGist}>
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
