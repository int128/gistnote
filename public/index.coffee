---
---

github =
  headers: ->
    if sessionStorage.token
      Authorization: "token #{sessionStorage.token}"
  gists: -> $.ajax 'https://api.github.com/gists', headers: @headers()
  gist: (id) -> $.ajax "https://api.github.com/gists/#{id}", headers: @headers()
  user: -> $.ajax 'https://api.github.com/user', headers: @headers()

vm = new Vue
  el: 'body'
  filters:
    marked: (content) -> marked(content) if content
    highlight: (content) -> hljs.highlightAuto(content).value if content
  data:
    user: null
    gists: []
    gist:
      meta: {}
      files: []
    authorized: sessionStorage.token
  methods:
    showUser: ->
      if @authorized
        github.user().then (user) => @user = user
    showList: ->
      github.gists().then (gists) => @gists = gists
    openGist: (id) ->
      if cached = (@gists.filter (gist) -> gist.id == id)[0]
        @openGistObject cached
      else
        github.gist(id).then (gist) => @openGistObject gist
    openGistObject: (gistObject) ->
      @gist.meta = gistObject
      @gist.files = Object.keys(gistObject.files).map (filename) ->
        file =
          meta: gistObject.files[filename]
          content: null
        $.get(file.meta.raw_url).then (content) -> file.content = content
        file
  compiled: ->
    marked.setOptions highlight: (code, lang) -> hljs.highlightAuto(code, [lang]).value
  ready: ->
    @showUser()
    @showList()

page '/authorize', ->
  clientId = '741e291348ea3f2305bd'
  endpoint = 'https://github.com/login/oauth/authorize'
  uri = "#{location.origin}/auth.html"
  scope = 'gist'
  sessionStorage.state = state = Math.random().toString(36)  # TODO: more secure method
  location.href = "#{endpoint}?client_id=#{clientId}&redirect_uri=#{uri}&scope=#{scope}&state=#{state}"

page '/logout', ->
  delete sessionStorage.token
  location.replace '/'

page '/:id', (context) ->
  vm.openGist(context.params.id)

page ->

page hashbang: true
