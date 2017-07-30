import request from 'request-promise-native';

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
            body.header_link_rel = {next: matches[1]};
          }
        }
        return body;
      },
    };
  }

  fetchNext(current) {
    return request(current.header_link_rel.next, this.defaultOptions()).then(next => {
      const concated = [...current, ...next];
      concated.header_link_rel = next.header_link_rel;
      return concated;
    });
  }

  getUser() {
    return request(`${GitHub.endpoint}/user`, this.defaultOptions());
  }

  findMyGists() {
    return request(`${GitHub.endpoint}/gists`, this.defaultOptions());
  }

  findUserGists(username) {
    return request(`${GitHub.endpoint}/users/${username}/gists`, this.defaultOptions());
  }

  findPublicGists() {
    return request(`${GitHub.endpoint}/gists/public`, this.defaultOptions());
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
}
