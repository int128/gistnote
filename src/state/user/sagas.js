import { takeEvery, put } from 'redux-saga/effects';

import * as actionTypes from './actionTypes';

function* login() {
}

function* logout() {
}

function* fetchAccessToken({code, state}) {
}

export default function* () {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.LOGOUT, logout);
  yield takeEvery(actionTypes.FETCH_ACCESS_TOKEN, fetchAccessToken);
}
