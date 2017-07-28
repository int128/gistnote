import React from 'react';

export default ({error}) => (
  <div className="alert alert-warning" role="alert">
    {error.statusCode
      ? <StatusCodeErrorMessage error={error}/>
      : <ErrorMessage error={error}/>}
  </div>
)

const ErrorMessage = ({error}) => (
  <span>
    {error.toString()}
  </span>
)

const StatusCodeErrorMessage = ({error}) => (
  <span>
    <strong>Server Error:</strong>
    &nbsp;
    {error.statusCode} {error.error.message}
  </span>
)
