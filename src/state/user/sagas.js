import { takeEvery, put } from 'redux-saga/effects';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as actionTypes from './actionTypes';

const OAUTH_STATE = 'OAUTH_STATE';
const OAUTH_BACK_URL = 'OAUTH_BACK_URL';

function login() {
  const { location } = window;
  const state = Math.random().toString(36).replace(/[^a-z]+/g, '');;
  sessionStorage.setItem(OAUTH_STATE, state);
  sessionStorage.setItem(OAUTH_BACK_URL, location.href);

  const endpoint = 'https://github.com/login/oauth/authorize';
  const clientId = '741e291348ea3f2305bd';
  const redirectUri = `${window.location.origin}/oauth`;
  const scope = 'gist,public_repo';
  location.href = `${endpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
}

function* fetchAccessToken({code, state}) {
  const savedState = sessionStorage.getItem(OAUTH_STATE);
  if (state === savedState) {
    const backUrl = sessionStorage.getItem(OAUTH_BACK_URL);
    //TODO
  } else {
    //FAIL
  }
}

function* fetchUser() {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.getOrNull().token);
  try {
    const data = yield github.getUser();
    yield put({type: actionTypes.RESOLVE_USER, data});
  } catch (error) {
    yield put({type: actionTypes.REJECT_USER, error});
  }
}

function* logout() {
}

export default function* () {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
  yield takeEvery(actionTypes.FETCH_ACCESS_TOKEN, fetchAccessToken);
  yield takeEvery(actionTypes.FETCH_USER, fetchUser);
}
