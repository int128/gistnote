import GitHub from '../infrastructure/GitHub';

import OAuthTokenRepository from './OAuthTokenRepository';

export default class GistRepository {
  oauthTokenRepository = new OAuthTokenRepository();
  gitHub = new GitHub(this.oauthTokenRepository.getOrNull().token);

  findPublicGists() {
    return this.gitHub.findPublicGists();
  }

  findUserGists() {
    return this.gitHub.findUserGists();
  }

  getGistContent(id) {
    return this.gitHub.getGistContent(id);
  }
}
