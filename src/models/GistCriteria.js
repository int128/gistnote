import { Record } from 'immutable';

export default class GistCriteria extends Record({
  type: null,
  username: null,
}) {
  static types = {
    PUBLIC: 'PUBLIC',
    MY: 'MY',
    USER: 'USER',
  }

  static PUBLIC = new GistCriteria({type: GistCriteria.types.PUBLIC})
  static MY = new GistCriteria({type: GistCriteria.types.MY})

  static createdBy = username => new GistCriteria({type: GistCriteria.types.USER, username})
}
