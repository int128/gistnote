import { Record } from 'immutable';

export default class Gists extends Record({
  loading: false,
  errors: [],
  array: [],
}) {
  static loading() {
    return new Gists({loading: true});
  }

  static succeeded(array) {
    return new Gists({array});
  }

  static failed(errors) {
    return new Gists({errors});
  }
}
