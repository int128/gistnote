import { takeEvery, put } from 'redux-saga/effects';

import GistRepository from '../../repositories/GistRepository';

import * as actionTypes from './actionTypes';

function* fetchGists({isPublic}) {
  const repository = new GistRepository();
  try {
    if (isPublic) {
      yield put({type: actionTypes.RESOLVE_GISTS, data: yield repository.findPublicGists()});
    } else {
      yield put({type: actionTypes.RESOLVE_GISTS, data: yield repository.findUserGists()});
    }
  } catch (error) {
    yield put({type: actionTypes.REJECT_GISTS, error});
  }
}

function* fetchGistContent({id}) {
  const repository = new GistRepository();
  try {
    yield put({type: actionTypes.RESOLVE_GIST_CONTENT, data: yield repository.getGistContent(id)});
  } catch (error) {
    yield put({type: actionTypes.REJECT_GIST_CONTENT, error});
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_GISTS, fetchGists);
  yield takeEvery(actionTypes.FETCH_GIST_CONTENT, fetchGistContent);
}
