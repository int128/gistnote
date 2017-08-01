import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as actionTypes from './actionTypes';

import { RESOLVED } from '../../models/PromiseResponse';

function* fetchGists({owner}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  const response = yield github.findGists(owner);
  yield put({type: actionTypes.FETCH_GISTS_DONE, response});
}

function* fetchNextGists({current}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  const response = yield github.fetchNext(current);
  yield put({type: actionTypes.FETCH_NEXT_GISTS_DONE, response});
}

function* fetchGist({id}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  const response = yield github.getGistContent(id);
  yield put({type: actionTypes.FETCH_GIST_DONE, response});
}

function* createGist({gist}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  const response = yield github.createGist(gist);
  yield put({type: actionTypes.CREATE_GIST_DONE, response});

  if (response.state === RESOLVED) {
    yield put(push(`/${response.data.id}`));
  }
}

function* updateGist({id, gist}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  const response = yield github.updateGist(id, gist);
  yield put({type: actionTypes.UPDATE_GIST_DONE, response});

  if (response.state === RESOLVED) {
    yield put(push(`/${response.data.id}`));
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_GISTS, fetchGists);
  yield takeEvery(actionTypes.FETCH_NEXT_GISTS, fetchNextGists);
  yield takeEvery(actionTypes.FETCH_GIST, fetchGist);
  yield takeEvery(actionTypes.CREATE_GIST, createGist);
  yield takeEvery(actionTypes.UPDATE_GIST, updateGist);
}
