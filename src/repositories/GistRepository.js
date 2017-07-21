import GitHub from '../infrastructure/GitHub';

import Gists from '../models/Gists';

export default class GistRepository {
  gitHub = new GitHub();

  *findPublicGists() {
    try {
      const array = yield this.gitHub.findPublicGists();
      return Gists.succeeded(array);
    } catch (e) {
      return Gists.failed([e]);
    }
  }

  findUserGists() {
    return this.gitHub.findUserGists();
  }
}
