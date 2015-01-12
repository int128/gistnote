---
---

app =
  clientId: '741e291348ea3f2305bd'

vm = new Vue
  el: 'body'
  data:
    gists: []
  methods:
    authorize: ->
      endpoint = 'https://github.com/login/oauth/authorize'
      scope = 'gist'
      sessionStorage.state = state = Math.random().toString(36)  # TODO: more secure method
      location.href = "#{endpoint}?client_id=#{app.clientId}&redirect_uri=#{location.href}&scope=#{scope}&state=#{state}"

github =
  gists: ->
    $.ajax 'https://api.github.com/gists',
      headers:
        Authorization: "token #{sessionStorage.token}"

if sessionStorage.token
  github.gists().then (gists) ->
    console.info gists
    vm.gists = gists

# OAuth2
if m = location.search.match(/\?code=(.+)&state=(.+)/)
  [_, code, state] = m
  if state == sessionStorage.state
    $.post 'https://gistnote.appspot.com/auth', code: code
    .then (token) ->
      sessionStorage.token = token
      delete sessionStorage.state
      location.replace '/'
    .fail (e) ->
      console.error e
  else
    console.error 'state did not match'
