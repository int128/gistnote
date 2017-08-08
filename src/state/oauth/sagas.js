import { takeEvery, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';
import PromiseAction from '../../infrastructure/PromiseAction';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenService from '../../infrastructure/OAuthTokenService';

import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';
import OAuthStateRepository from '../../repositories/OAuthStateRepository';

import OAuthState from '../../models/OAuthState';

import * as actionTypes from './actionTypes';
import { invalidateSession } from './actionCreators';

function login() {
  const oauthState = OAuthState.backPath(window.location.pathname);
  const oauthStateRepository = new OAuthStateRepository();
  oauthStateRepository.save(oauthState);

  window.location.href = GitHub.authorizeUrl({
    client_id: 'e1d2b601cc9c4eea4f5f',
    redirect_uri: `${window.location.origin}/oauth`,
    scope: 'gist,public_repo',
    state: oauthState.state,
  });
}

function* acquireSession({type, code, state}) {
  const oauthStateRepository = new OAuthStateRepository();
  const oauthState = oauthStateRepository.get();
  if (oauthState.verifyState(state)) {
    try {
      const oauthTokenService = new OAuthTokenService();
      const oauthToken = yield oauthTokenService.requestAccessToken(code);
      const oauthTokenRepository = new OAuthTokenRepository();
      oauthTokenRepository.save(oauthToken);
      yield put(PromiseAction.resolved(type, oauthToken));
      yield put(replace(oauthState.backPath));
    } catch (error) {
      yield put(PromiseAction.rejected(type, error));
    }
  } else {
    yield put(PromiseAction.rejected(type, new Error('Invalid state')));
  }
}

function* logout() {
  const oauthTokenRepository = new OAuthTokenRepository();
  oauthTokenRepository.remove();
  yield put(invalidateSession());
  yield put(push('/'));
}

export default function* () {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.ACQUIRE_SESSION, acquireSession);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
