---
---

github =
  endpoint: 'https://api.github.com'
  scope: 'gist,public_repo'
  token: null
  get: (resource) ->
    $.ajax "#{@endpoint}/#{resource}",
      headers:
        Authorization: "token #{@token}" if @token
  post: (resource, data) ->
    $.ajax "#{@endpoint}/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'POST'
      headers:
        Authorization: "token #{@token}" if @token
  put: (resource, data) ->
    $.ajax "#{@endpoint}/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'PUT'
      headers:
        Authorization: "token #{@token}" if @token
  patch: (resource, data) ->
    $.ajax "#{@endpoint}/#{resource}",
      data: data
      contentType: 'application/json'
      type: 'PATCH'
      headers:
        Authorization: "token #{@token}" if @token
  user:                 -> @get   'user'
  gists: (options)      -> if options.public then @get 'gists/public' else @get 'gists'
  gist: (id)            -> @get   "gists/#{id}"
  createGist: (req)     -> @post  'gists', JSON.stringify(req)
  updateGist: (id, req) -> @patch "gists/#{id}", JSON.stringify(req)
  repo: (owner, repo)             -> @get  "repos/#{owner}/#{repo}"
  createIssue: (owner, repo, req) -> @post "repos/#{owner}/#{repo}/issues", JSON.stringify(req)

if localStorage.scope == github.scope
  github.token = localStorage.token

vmIndex = -> new Vue
  el: 'body'
  data:
    app:
      name: '{{site.title}}'
      feedback: '{{site.github.url}}/issues/new'
    user: null
    gist: null
    state: 'loading'
    publicGists: !github.token
  computed:
    pageTitle: -> switch @state
      when 'new'  then "New Gist | {{site.title}}"
      when 'view' then "#{@gist.description or @gist.id} | {{site.title}}"
      when 'edit' then "#{@gist.description or @gist.id} | {{site.title}}"
      else             '{{site.title}}'
  methods:
    navigate: (state, gist = null) -> [@state, @gist] = [state, gist]
    fetchUser: ->
      if github.token
        github.user().then (user) => @user = user
    fetchGist: (id) ->
      github.gist id
        .then (gist) ->
          gist.files = Object.keys(gist.files).map (name) -> gist.files[name]
          gist
    openGist: (id) ->
      @state = 'loading'
      @fetchGist(id)
        .then (gist)  => [@gist, @state] = [gist, 'view']
        .fail (error) => [@gist, @state] = [error, 'error']
    editGist: (id) ->
      @state = 'loading'
      @fetchGist(id)
        .then (gist)  => [@gist, @state] = [gist, 'edit']
        .fail (error) => [@gist, @state] = [error, 'error']
    newGist: ->
      @state = 'loading'
      @gist = description: '', files: [filename: 'gistfile1.md', content: '']
      @state = 'new'
    openTop: ->
      @state = 'top'
  filters:
    marked: (content) -> marked(content) if content
    highlight: (content) -> hljs.highlightAuto(content).value if content
    timeago: (time) -> $.timeago(time)
    gistTitle: (gist) -> gist.description or "gist:#{gist.id}" if gist
  created: ->
    @fetchUser()
    @$watch 'pageTitle', -> document.title = @pageTitle
  compiled: ->
    marked.setOptions highlight: (code, lang) -> hljs.highlightAuto(code, [lang]).value
  components:
    'login-status':       template: '#template-login-status'
    'gist-top':           template: '#template-gist-top'
    'gist-loading':       template: '#template-gist-loading'
    'gist-view':          template: '#template-gist-view'
    'gist-error':         template: '#template-gist-error'
    'gist-view-metadata': template: '#template-gist-view-metadata'
    'gist-view-owner':    template: '#template-gist-view-owner'
    'gist-edit-tips':     template: '#template-gist-edit-tips'
    'api-error':          template: '#template-api-error'

    'gists':
      template: '#template-gists'
      data: ->
        gists: []
        loading: false
      methods:
        fetchGists: ->
          [@gists, @loading] = [[], true]
          github.gists(public: @public).then (gists) => [@gists, @loading] = [gists, false]
      created: ->
        @fetchGists()
        @$watch 'public', -> @fetchGists()

    'gist-new':
      template: '#template-gist-new'
      data: ->
        saving: false
        error: null
      methods:
        createGist: (isPublic) ->
          req =
            public: isPublic
            description: @gist.description
            files: {}
          @gist.files.forEach (file) -> req.files[file.filename] = content: file.content
          [@saving, @error] = [true, null]
          github.createGist req
            .then (created) -> page "/#{created.id}"
            .fail (error) => @error = error
            .always => @saving = false
        newGistFile: ->
          @gist.files.push
            filename: "gistfile#{@gist.files.length + 1}.md"
            content: ''

    'gist-new-file':
      template: '#template-gist-new-file'
      methods:
        removeGistFile: (filename) ->
          @gist.files = @gist.files.filter (file) -> file.filename != filename

    'gist-edit':
      template: '#template-gist-edit'
      data: ->
        saving: false
        error: null
      methods:
        updateGist: ->
          req =
            description: @gist.description
            files: {}
          @gist.files.forEach (file) ->
            req.files[file.filename] = if file.state == 'removed' then null else content: file.content
          [@saving, @error] = [true, null]
          github.updateGist @gist.id, req
            .then (created) -> page "/#{created.id}"
            .fail (error) => @error = error
            .always => @saving = false
        newGistFile: ->
          @gist.files.push
            filename: "gistfile#{@gist.files.length + 1}.md"
            content: ''
            state: 'new'

    'gist-edit-file':
      template: '#template-gist-edit-file'
      data: ->
        state: 'loaded'
      methods:
        removeGistFile: (filename) ->
          @gist.files = @gist.files.filter (file) -> file.filename != filename

    'gist-top-stars':
      template: '#template-gist-top-stars'
      data: ->
        stars: 0
      created: ->
        github.repo('{{site.github.owner}}', '{{site.github.repo}}').then (repo) => @stars = repo.stargazers_count

    'gist-top-feedback':
      template: '#template-gist-top-feedback'
      data: ->
        feedback: ''
        saving: false
        saved: null
        error: null
      methods:
        sendFeedback: ->
          [@saving, @error] = [true, null]
          github.createIssue '{{site.github.owner}}', '{{site.github.repo}}', title: 'Feedback', body: @feedback
            .then (created) => @saved = created
            .fail (error) => @error = error
            .always => @saving = false

routesIndex = ->
  page '/login', ->
    clientId = '741e291348ea3f2305bd'
    endpoint = 'https://github.com/login/oauth/authorize'
    uri = "#{location.origin}/auth.html"
    scope = github.scope
    sessionStorage.state = state = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
    location.href = "#{endpoint}?client_id=#{clientId}&redirect_uri=#{uri}&scope=#{scope}&state=#{state}"

  page '/logout', ->
    delete localStorage.token
    delete localStorage.scope
    location.replace '/'

  page '/new',                  -> vm().newGist()
  page '/:id',        (context) -> vm().openGist context.params.id
  page '/:id/edit',   (context) -> vm().editGist context.params.id
  page '/slide/:id',  (context) -> location.replace "/slide/#{context.params.id}"
  page                          -> vm().openTop()

  _vm = null
  vm = -> _vm or (_vm = vmIndex())

routesSlide = ->
  page '/slide/:id', (context) ->
    github.gist context.params.id
      .then (gist) ->
        document.title = "#{gist.description or gist.id} | {{site.title}} Slide"
        new Vue
          el: 'body'
          data: gist: gist
          components: shown: template: '#template-slide', inherit: true
          ready: ->
            content = Object.keys(gist.files)
              .map    (name) -> gist.files[name]
              .filter (file) -> file.language == 'Markdown'
              .map    (file) -> file.content
              .join '\n---\n'
            remark.create source: content

      .fail (error) ->
        new Vue
          el: 'body'
          data: error: error
          components: shown: template: '#template-not-found', inherit: true

  page '/:id', (context) -> location.replace "/#{context.params.id}"

  page ->
    new Vue
      el: 'body'
      components: shown: template: '#template-not-found'

switch location.pathname
  when '/'
    routesIndex()
  when '/slide.html'
    routesSlide()
  else
    location.replace '/'

if location.hash
  # Handles redirect from 404 page
  page dispatch: false
  page.redirect location.hash.substring(2)
else
  page()
