---
---

vm = new Vue
  el: 'body'
  data:
    gists: []
    authorized: sessionStorage.token
  methods:
    authorize: ->
      clientId = '741e291348ea3f2305bd'
      endpoint = 'https://github.com/login/oauth/authorize'
      uri = "#{location.origin}/auth.html"
      scope = 'gist'
      sessionStorage.state = state = Math.random().toString(36)  # TODO: more secure method
      location.href = "#{endpoint}?client_id=#{clientId}&redirect_uri=#{uri}&scope=#{scope}&state=#{state}"

github =
  gists: ->
    $.ajax 'https://api.github.com/gists',
      headers:
        Authorization: "token #{sessionStorage.token}"

github.gists().then (gists) ->
  console.info gists
  vm.gists = gists
