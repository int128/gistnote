import queryString from 'query-string';

import GistCriteria from '../models/GistCriteria';
import OAuthToken from '../models/OAuthToken';

export default class GitHub {
  static endpoint = 'https://api.github.com'
  static scope = 'gist,public_repo'

  constructor(token = OAuthToken.NONE) {
    this.token = token;
  }

  fetch(url, options = {}) {
    const headers = new Headers(options.headers);
    const authorization = this.token.getAuthorizationHeader();
    if (authorization) {
      headers.set('authorization', authorization);
    }
    return fetch(url, {
      mode: 'cors',
      ...options,
      headers,
    }).then(response => {
      if (response.ok) {
        return response.json().then(body => {
          const link = response.headers.get('link');
          if (link) {
            const matches = link.match(/<(.+?)>; rel="next"/);
            if (matches) {
              body._link_next = matches[1];
            }
          }
          return body;
        });
      } else {
        return response.json()
          .then(body => {throw body})
          .catch(e => {throw e});
      }
    });
  }

  fetchNext(current) {
    return this.fetch(current._link_next);
  }

  getUser() {
    return this.fetch(`${GitHub.endpoint}/user`);
  }

  listGists(owner) {
    let url;
    switch (owner.type) {
      case GistCriteria.types.PUBLIC:
        url = `${GitHub.endpoint}/gists/public`;
        break;
      case GistCriteria.types.MY:
        url = `${GitHub.endpoint}/gists`;
        break;
      case GistCriteria.types.USER:
        url = `${GitHub.endpoint}/users/${owner.username}/gists`;
        break;
      default:
        throw new Error(`owner.type must be one of ${GistCriteria.types} but ${owner.type}`);
    }
    return this.fetch(url);
  }

  getGistContent(id) {
    return this.fetch(`${GitHub.endpoint}/gists/${id}`);
  }

  createGist(gist) {
    return this.fetch(`${GitHub.endpoint}/gists`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gist),
    });
  }

  updateGist(id, gist) {
    return this.fetch(`${GitHub.endpoint}/gists/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gist),
    });
  }

  getRepository(owner, repo) {
    return this.fetch(`${GitHub.endpoint}/repos/${owner}/${repo}`);
  }

  createIssue(owner, repo, issue) {
    return this.fetch(`${GitHub.endpoint}/repos/${owner}/${repo}/issues`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(issue),
    });
  }

  static authorizeUrl({client_id, redirect_uri, scope, state}) {
    const params = queryString.stringify({
      client_id, redirect_uri, scope, state,
    });
    return `https://github.com/login/oauth/authorize?${params}`;
  }
}
