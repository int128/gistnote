---
---

# Enforce reload after authorization to clear cache
if sessionStorage.state
  delete sessionStorage.state
  location.reload true

github =
  token: localStorage.token
  get: (resource) ->
    $.ajax "https://api.github.com/#{resource}",
      headers: Authorization: "token #{@token}" if @token
  patch: (resource, data) ->
    $.ajax "https://api.github.com/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'PATCH'
      headers: Authorization: "token #{@token}"
  gistsOfCurrentUser: -> @get 'gists'
  gistsOfPublic:      -> @get 'gists/public'
  gist: (id)          -> @get "gists/#{id}"
  saveGist: (id, req) -> @patch "gists/#{id}", JSON.stringify(req)
  user:               -> @get 'user'

vm = new Vue
  el: 'body'
  data:
    user: null
    gists:
      all: []
      isPublic: !github.token
    gist: null
    edit: false
    topPage: false
  methods:
    fetchUser: ->
      if github.token
        github.user().then (user) => @user = user
    fetchGists: ->
      if @gists.isPublic
        github.gistsOfPublic().then (gists) => @gists.all = gists
      else
        github.gistsOfCurrentUser().then (gists) => @gists.all = gists
    fetchGist: (id) ->
      if @gist?.id != id
        github.gist(id).then (gist) => @gist = gist
        @gist = null
    saveGist: ->
      req =
        description: @gist.description
        files: {}
      Object.keys(@gist.files).map (name) => req.files[name] = content: @gist.files[name].content
      github.saveGist(@gist.id, req).then =>
        page "/#{@gist.id}"
    openGist: (id) ->
      @edit = false
      @topPage = false
      @fetchGist(id)
    editGist: (id) ->
      @edit = true
      @topPage = false
      @fetchGist(id)
    openTopPage: ->
      @topPage = true
      @gist = null
  components:
    'login-status':  template: '#template-login-status'
    'gists-list':    template: '#template-gists-list'
    'gist-metadata': template: '#template-gist-metadata'
  filters:
    marked: (content) -> marked(content) if content
    highlight: (content) -> hljs.highlightAuto(content).value if content
    timeago: (time) -> $.timeago(time)
    gistTitle: (gist) -> gist.description or "gist:#{gist.id}" if gist
  created: ->
    @fetchUser()
    @fetchGists()
    @$watch 'gists.isPublic', -> @fetchGists()
  compiled: ->
    marked.setOptions highlight: (code, lang) -> hljs.highlightAuto(code, [lang]).value

page '/login', ->
  clientId = '741e291348ea3f2305bd'
  endpoint = 'https://github.com/login/oauth/authorize'
  uri = "#{location.origin}/auth.html"
  scope = 'gist'
  sessionStorage.state = state = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
  location.href = "#{endpoint}?client_id=#{clientId}&redirect_uri=#{uri}&scope=#{scope}&state=#{state}"

page '/logout', ->
  delete localStorage.token
  location.replace '/'

page '/:id', (context) ->
  vm.openGist context.params.id

page '/:id/edit', (context) ->
  vm.editGist context.params.id

page ->
  vm.openTopPage()

page hashbang: true
