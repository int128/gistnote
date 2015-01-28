---
---

if m = location.search.match(/\?code=(.+)&state=(.+)/)
  [_, code, state] = m
  if state == sessionStorage.state
    $.post 'https://gistnote.appspot.com/authorize', code: code
    .then (exchanged) ->
      localStorage.token = exchanged.token
      localStorage.scope = exchanged.scope
      location.replace '/'
    .fail (e) ->
      $ ->
        $('#authorization-error').show()
  else
    location.replace '/'
else
  location.replace '/'
