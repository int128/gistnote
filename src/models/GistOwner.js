import { Record } from 'immutable';

export const PUBLIC = 'PUBLIC';
export const MY = 'MY';
export const USER = 'USER';

export default class GistOwner extends Record({
  type: PUBLIC,
  username: null,
}) {
  static PUBLIC = new GistOwner({type: PUBLIC})
  static MY = new GistOwner({type: MY})
  static userOf = (username) => new GistOwner({type: USER, username})
}
