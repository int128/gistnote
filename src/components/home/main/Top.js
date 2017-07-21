import React from 'react';

export default () => (
  <div>
    <div className="clearfix"></div>
    <div className="jumbotron text-center">
      <img src="/logo.png" alt="logo"/>
      <h1>Gistnote</h1>
      <p>Evernote like Gist client app</p>
      <p><a href="/login" className="btn btn-primary">Sign in with GitHub</a></p>
      <p>gist-top-stars</p>
    </div>
    <div className="row">
      <div className="col-md-6 col-lg-6 col-md-offset-3 col-lg-offset-3">gist-top-feedback</div>
    </div>
    <div className="text-center gn-copyright">
      <p>Gistnote is a Gist client app based on JavaScript. &copy; Hidetake Iwata, 2015.</p>
      <p>Thanks to <a href="http://findicons.com/icon/591630/sticky_notes">Metro Uinvert Dock Icon</a>.</p>
    </div>
  </div>
)
