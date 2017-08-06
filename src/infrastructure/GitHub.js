import request from 'request-promise-native';
import queryString from 'query-string';

import GistCriteria from '../models/GistCriteria';
import OAuthToken from '../models/OAuthToken';

export default class GitHub {
  static endpoint = 'https://api.github.com'
  static scope = 'gist,public_repo'

  constructor(token = OAuthToken.NONE) {
    this.token = token;
  }

  defaultOptions() {
    const authorization = this.token.getAuthorizationHeader();
    return {
      json: true,
      headers: {authorization},
      transform: (body, response) => {
        const link = response.headers['link'];
        if (link) {
          const matches = link.match(/<(.+?)>; rel="next"/);
          if (matches) {
            body._link_next = matches[1];
          }
        }
        return body;
      },
    };
  }

  fetchNext(current) {
    return request(current._link_next, this.defaultOptions());
  }

  getUser() {
    return request(`${GitHub.endpoint}/user`, this.defaultOptions());
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
    return request(url, this.defaultOptions());
  }

  getGistContent(id) {
    return request(`${GitHub.endpoint}/gists/${id}`, this.defaultOptions());
  }

  createGist(gist) {
    return request(`${GitHub.endpoint}/gists`, {
      ...this.defaultOptions(),
      method: 'POST',
      body: gist,
    });
  }

  updateGist(id, gist) {
    return request(`${GitHub.endpoint}/gists/${id}`, {
      ...this.defaultOptions(),
      method: 'PATCH',
      body: gist,
    });
  }

  getRepository(owner, repo) {
    return request(`${GitHub.endpoint}/repos/${owner}/${repo}`, this.defaultOptions());
  }

  createIssue(owner, repo, issue) {
    return request(`${GitHub.endpoint}/repos/${owner}/${repo}/issues`, {
      ...this.defaultOptions(),
      method: 'POST',
      body: issue,
    });
  }

  static authorizeUrl({client_id, redirect_uri, scope, state}) {
    const params = queryString.stringify({
      client_id, redirect_uri, scope, state,
    });
    return `https://github.com/login/oauth/authorize?${params}`;
  }
}
