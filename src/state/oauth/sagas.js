import { takeEvery, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';
import queryString from 'query-string';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenService from '../../infrastructure/OAuthTokenService';

import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';
import OAuthStateRepository from '../../repositories/OAuthStateRepository';

import OAuthState from '../../models/OAuthState';

import * as actionTypes from './actionTypes';

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

function* handleOAuthRedirect() {
  const params = queryString.parse(window.location.search);
  const { code, state } = params;
  if (code && state) {
    const oauthStateRepository = new OAuthStateRepository();
    const oauthState = oauthStateRepository.get();
    if (oauthState.verifyState(state)) {
      const oauthTokenService = new OAuthTokenService();
      const oauthToken = yield oauthTokenService.requestAccessToken(code);
      const oauthTokenRepository = new OAuthTokenRepository();
      oauthTokenRepository.save(oauthToken);
      yield put(replace(oauthState.backPath));
    } else {
      console.error('Invalid state', params);
    }
  } else {
    console.error('No code and state', params);
  }
}

function* logout() {
  const oauthTokenRepository = new OAuthTokenRepository();
  oauthTokenRepository.remove();
  yield put(push('/'));
}

export default function* () {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.HANDLE_OAUTH_REDIRECT, handleOAuthRedirect);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
