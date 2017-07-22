import GitHub from '../infrastructure/GitHub';

export default class GistRepository {
  gitHub = new GitHub();

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
