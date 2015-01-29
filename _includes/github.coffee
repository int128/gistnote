github =
  endpoint: 'https://api.github.com'
  scope: 'gist,public_repo'
  token: null
  get: (resource) ->
    $.ajax "#{@endpoint}/#{resource}",
      headers: Authorization: "token #{@token}" if @token
  post: (resource, data) ->
    $.ajax "#{@endpoint}/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'POST'
      headers: Authorization: "token #{@token}"
  put: (resource, data) ->
    $.ajax "#{@endpoint}/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'PUT'
      headers: Authorization: "token #{@token}"
  patch: (resource, data) ->
    $.ajax "#{@endpoint}/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'PATCH'
      headers: Authorization: "token #{@token}"
  user:                 -> @get   'user'
  gists: (options)      -> if options.public then @get 'gists/public' else @get 'gists'
  gist: (id)            -> @get   "gists/#{id}"
  createGist: (req)     -> @post  'gists', JSON.stringify(req)
  updateGist: (id, req) -> @patch "gists/#{id}", JSON.stringify(req)
  repo: (owner, repo)             -> @get  "repos/#{owner}/#{repo}"
  createIssue: (owner, repo, req) -> @post "repos/#{owner}/#{repo}/issues", JSON.stringify(req)

if localStorage.scope == github.scope
  github.token = localStorage.token
