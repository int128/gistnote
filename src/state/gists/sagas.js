import { takeEvery, put } from 'redux-saga/effects';

import GistRepository from '../../repositories/GistRepository';

import * as actionTypes from './actionTypes';

function* fetchPublicGists() {
  const repository = new GistRepository();
  const gists = yield repository.findPublicGists();
  yield put({type: actionTypes.RECEIVE_PUBLIC_GISTS, gists});
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_PUBLIC_GISTS, fetchPublicGists);
}
