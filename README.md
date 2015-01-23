Gistnote
========

Gistnote is a Gist client app based on HTML5 and JavaScript.

It is deployed on GitHub Pages: https://gistnote.github.io

## Architecture

The client app sends requests directly to GitHub API using CORS, except OAuth 2 authorization request because the client secret should not be exposed.

* Client app
  * GitHub Pages (Jekyll)
  * HTML5 based Web Application
  * CoffeeScript
  * Vue.js
  * Page.js
  * Marked.js
  * Highlight.js
  * jQuery timeago
  * Bootswatch
* Server app
  * Google App Engine (JavaVM)
  * Groovy 2.3

### Authorization

OAuth 2 authorization request is processed on the server side app. OAuth token is only stored in the local storage of the browser.

1. User clicks the login button.
1. Client app redirects to GitHub OAuth.
1. GitHub OAuth processes the authorization request and redirects back to the client app with the authorization code.
1. Client app exchanges the authorization code and token via the server app.
  1. Client app sends the authorization code to the server app.
  1. Server app sends the authorization code with the client secret to GitHub OAuth.
  1. GitHub OAuth responses the token.
  1. Client app stores the token in the local storage of the browser.
1. Client app redirects to the top page.

## Build

CoffeeScript is compiled by Jekyll on GitHub Pages.

All dependencies of the client app is fetched by bower and packed into `/public/lib.js` by gulp.

Install node dependencies and invoke gulp to build as follow:

```sh
npm install
npm install -g gulp
gulp
```

## Contributions

This is an open source software licensed under the Apache License Version 2.0. Send me an issue or pull request.
