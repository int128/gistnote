import { fork } from 'redux-saga/effects';

import gists from './gists/sagas';
import user from './user/sagas';

export default function* () {
  yield fork(gists);
  yield fork(user);
}
