import request from 'request-promise-native';

import * as ownerTypes from '../models/GistOwner';
import OAuthToken from '../models/OAuthToken';
import PromiseResponse from '../models/PromiseResponse';

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
    }).then(data => PromiseResponse.createResolved(data))
    .catch(error => PromiseResponse.createRejected(error));
  }

  getUser() {
    return request(`${GitHub.endpoint}/user`, this.defaultOptions());
  }

  *findGists(owner) {
    let url;
    switch (owner.type) {
      case ownerTypes.PUBLIC:
        url = `${GitHub.endpoint}/gists/public`;
        break;
      case ownerTypes.MY:
        url = `${GitHub.endpoint}/gists`;
        break;
      case ownerTypes.USER:
        url = `${GitHub.endpoint}/users/${owner.username}/gists`;
        break;
      default:
        throw new Error(`owner.type must be one of ${ownerTypes} but ${owner.type}`);
    }
    try {
      const data = yield request(url, this.defaultOptions());
      return PromiseResponse.createResolved(data);
    } catch (error) {
      return PromiseResponse.createRejected(error);
    }
  }

  *getGistContent(id) {
    try {
      const data = yield request(`${GitHub.endpoint}/gists/${id}`, this.defaultOptions());
      return PromiseResponse.createResolved(data);
    } catch (error) {
      return PromiseResponse.createRejected(error);
    }
  }

  *createGist(gist) {
    try {
      const data = yield request(`${GitHub.endpoint}/gists`, {
        ...this.defaultOptions(),
        method: 'POST',
        body: gist,
      });
      return PromiseResponse.createResolved(data);
    } catch (error) {
      return PromiseResponse.createRejected(error);
    }
  }

  *updateGist(id, gist) {
    try {
      const data = yield request(`${GitHub.endpoint}/gists/${id}`, {
        ...this.defaultOptions(),
        method: 'PATCH',
        body: gist,
      });
      return PromiseResponse.createResolved(data);
    } catch (error) {
      return PromiseResponse.createRejected(error);
    }
  }

  *getRepository(owner, repo) {
    try {
      const data = yield request(`${GitHub.endpoint}/repos/${owner}/${repo}`, this.defaultOptions());
      return PromiseResponse.createResolved(data);
    } catch (error) {
      return PromiseResponse.createRejected(error);
    }
  }

  *createIssue(owner, repo, issue) {
    try {
      const data = yield request(`${GitHub.endpoint}/repos/${owner}/${repo}/issues`, {
        ...this.defaultOptions(),
        method: 'POST',
        body: issue,
      });
      return PromiseResponse.createResolved(data);
    } catch (error) {
      return PromiseResponse.createRejected(error);
    }
  }
}
