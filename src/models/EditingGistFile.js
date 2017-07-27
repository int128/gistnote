import { Record } from 'immutable';

/**
 * @see https://developer.github.com/v3/gists/#edit-a-gist
 */
export default class EditingGistFile extends Record({
  id: null,
  originalFilename: null,
  filename: null,
  content: null,
  remove: false,
}) {
  static createFromGistContentFile(id, {filename, content}) {
    return new EditingGistFile({
      id,
      originalFilename: filename,
      filename,
      content,
    });
  }

  static createNew(id) {
    return new EditingGistFile({
      id,
      filename: `gistfile${id}.txt`,
      content: '',
    });
  }

  renameTo(value) {
    return this.set('filename', value);
  }

  setContent(value) {
    return this.set('content', value);
  }

  toggleRemove() {
    return this.set('remove', !this.remove);
  }

  toGitHubRequest() {
    const createNewFile = this.originalFilename === null;
    if (createNewFile) {
      if (this.remove) {
        return {};
      } else {
        return {[this.originalFilename]: null};
      }
    } else {
      if (this.remove) {
        return {[this.originalFilename]: null};
      } else {
        const renameFile = this.originalFilename !== this.filename;
        return {
          [this.filename]: {
            filename: renameFile ? this.filename : undefined,
            content: this.content,
          }
        };
      }
    }
  }
}
