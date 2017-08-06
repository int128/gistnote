import { fork } from 'redux-saga/effects';

import gists from './gists/sagas';
import user from './user/sagas';
import oauth from './oauth/sagas';

export default function* () {
  yield fork(gists);
  yield fork(user);
  yield fork(oauth);
}
