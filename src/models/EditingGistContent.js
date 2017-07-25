import { Record, Seq } from 'immutable';

import EditingGistContentFile from './EditingGistContentFile';

/**
 * @see https://developer.github.com/v3/gists/#edit-a-gist
 */
export default class EditingGistContent extends Record({
  gist: null,
  description: null,
  files: Seq(),
}) {
  static createFromGistContent(gist) {
    return new EditingGistContent({
      gist,
      description: gist.description,
      files: Seq(gist.files).valueSeq().map((file, index) =>
        EditingGistContentFile.createFromGistContentFile(index, file)),
    });
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
      this.files.concat([EditingGistContentFile.createNew(this.files.size)]));
  }

  toGitHubRequest() {
    return {
      description: this.description,
      files: this.files
        .map(file => Seq(file.toGitHubRequest()))
        .reduce((r, file) => Seq(r).concat(file))
        .toJS(),
    };
  }
}
