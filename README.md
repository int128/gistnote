Gistnote
========

Gistnote is a Gist client app based on HTML5 and JavaScript.

It is deployed on GitHub Pages: https://gistnote.github.io


## Architecture

The client app sends requests directly to GitHub API using CORS, except OAuth 2 authorization request because the client secret should not be exposed.

* Client app
  * GitHub Pages
  * HTML5
  * ECMAScript 6
  * React
  * Redux Saga
  * React Router Redux
  * Immutable.js
  * React Syntax Highlighter
  * Remark React
  * Bootswatch
* Server app
  * Google Cloud Functions (WIP)


## Build

Run on localhost:

```sh
npm start
```

Build the production:

```sh
npm run build
```


## Contributions

This is an open source software licensed under the Apache License Version 2.0.
Feel free to open an issue or pull request.
