---
---

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
