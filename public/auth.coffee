---
---

if m = location.search.match(/\?code=(.+)&state=(.+)/)
  [_, code, state] = m
  if state == sessionStorage.state
    $.post 'https://gistnote.appspot.com/auth', code: code
    .then (token) ->
      localStorage.token = token
      location.replace '/'
    .fail (e) ->
      $ ->
        $('#authorization-error').show()
  else
    location.replace '/'
else
  location.replace '/'
