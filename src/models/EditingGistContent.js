import { Record, Seq } from 'immutable';

import EditingGistContentFile from './EditingGistContentFile';

export default class EditingGistContent extends Record({
  description: null,
  files: Seq(),
}) {
  static createFromGistContent(gistContent) {
    return new EditingGistContent({
      description: gistContent.description,
      files: Seq(gistContent.files).map(file => new EditingGistContentFile(file)),
    });
  }
}
