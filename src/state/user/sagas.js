import { takeEvery, put } from 'redux-saga/effects';
import GitHub from '../../infrastructure/GitHub';
import PromiseAction from '../../infrastructure/PromiseAction';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as actionTypes from './actionTypes';

function* readUserProfile({type}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const payload = yield github.getUser();
    yield put(PromiseAction.resolved(type, payload));
  } catch (error) {
    yield put(PromiseAction.rejected(type, error));
  }
}

export default function* () {
  yield takeEvery(actionTypes.READ_USER_PROFILE, readUserProfile);
}
