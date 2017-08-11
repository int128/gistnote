import React from 'react';

export default ({error}) => (
  <div className="alert alert-warning" role="alert">
    {error.message ? error.message : error.toString()}
  </div>
)
