import request from 'request-promise-native';

export default class GitHub {
  static endpoint = 'https://api.github.com'
  static scope = 'gist,public_repo'

  constructor(token = null) {
    this.token = token;
  }

  defaultOptions() {
    const authorization = this.token ? `token ${this.token}` : undefined;
    return {
      json: true,
      headers: {authorization},
      transform: (body, response) => {
        const link = response.headers['link'];
        if (link) {
          const matches = link.match(/<.+?page=(.+?)>; rel="next"/);
          if (matches) {
            body.nextPage = matches[1];
          }
        }
        return body;
      },
    };
  }

  getUser() {
    return request(`${GitHub.endpoint}/user`, this.defaultOptions());
  }

  findUserGists() {
    return request(`${GitHub.endpoint}/gists`, this.defaultOptions());
  }

  findPublicGists() {
    return request(`${GitHub.endpoint}/gists/public`, this.defaultOptions());
  }

  getGist(id) {
    return request(`${GitHub.endpoint}/gists/${id}`, this.defaultOptions());
  }

  createGist(gist) {
    return request(`${GitHub.endpoint}/gists`, {
      ...this.defaultOptions(),
      method: 'POST',
      body: gist,
    });
  }

  updateGist(gist) {
    return request(`${GitHub.endpoint}/gists`, {
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
