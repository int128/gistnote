import { Record, Seq } from 'immutable';

import EditingGistFile from './EditingGistFile';

/**
 * @see https://developer.github.com/v3/gists/#edit-a-gist
 */
export default class EditingGist extends Record({
  public: undefined,
  originalGist: null,
  description: '',
  files: Seq.of(EditingGistFile.createNew()),
}) {
  static createFromExistentGist(originalGist) {
    return new EditingGist({
      originalGist,
      description: originalGist.description,
      files: Seq(originalGist.files).valueSeq().map((file, index) =>
        EditingGistFile.createFromGistContentFile(index, file)),
    });
  }

  static createNew() {
    return new EditingGist();
  }

  isNew() {
    return this.originalGist === null;
  }

  setDescription(value) {
    return this.set('description', value);
  }

  setFile(file) {
    return this.set('files', this.files.map(currentFile => {
      if (currentFile.id === file.id) {
        return file;
      } else {
        return currentFile;
      }
    }));
  }

  addNewFile() {
    return this.set('files',
      this.files.concat([EditingGistFile.createNew(this.files.size)]));
  }

  setAsPublic() {
    return this.set('public', true);
  }

  setAsPrivate() {
    return this.set('public', false);
  }

  toGitHubRequest() {
    return {
      public: this.public,
      description: this.description,
      files: this.files
        .map(file => Seq(file.toGitHubRequest()))
        .reduce((r, file) => Seq(r).concat(file))
        .toJS(),
    };
  }
}
