import { Record } from 'immutable';

export default class EditingGistContentFile extends Record({
  filename: null,
  content: null,
}) {
}
