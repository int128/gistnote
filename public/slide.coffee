---
---

{% include github.coffee %}

fetchGist = (id) ->
  github.gist id
    .then (gist) ->
      document.title = gist.description or gist.id
      contents = Object.keys(gist.files)
        .map (name) -> gist.files[name]
        .filter (file) -> file.language == 'Markdown'
        .map (file) -> file.content
      remark.create source: contents.join('\n---\n')

    .fail (error) ->
      $('.alert').text("#{error.status} #{error.statusText} (#{error.responseJSON.message})").show()

    .always ->
      $('.loading').hide()

id = location.search.substring(2)

fetchGist id
