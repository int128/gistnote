import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import GitHub from '../../infrastructure/GitHub';
import PromiseAction from '../../infrastructure/PromiseAction';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as actionTypes from './actionTypes';

function* listGists({type, owner}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const payload = yield github.listGists(owner);
    yield put(PromiseAction.resolved(type, payload));
  } catch (error) {
    yield put(PromiseAction.rejected(type, error));
  }
}

function* listNextGists({type, pagenation}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const payload = yield github.fetchNext(pagenation);
    yield put(PromiseAction.resolved(type, payload));
  } catch (error) {
    yield put(PromiseAction.rejected(type, error));
  }
}

function* readGist({type, id}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const payload = yield github.getGistContent(id);
    yield put(PromiseAction.resolved(type, payload));
  } catch (error) {
    yield put(PromiseAction.rejected(type, error));
  }
}

function* createGist({type, payload}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const created = yield github.createGist(payload.toGitHubRequest());
    yield put(PromiseAction.resolved(type, created));
    yield put(push(`/${created.id}`));
  } catch (error) {
    yield put(PromiseAction.rejected(type, error));
  }
}

function* updateGist({type, payload}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const { id } = payload.originalGist;
    const updated = yield github.updateGist(id, payload.toGitHubRequest());
    yield put(PromiseAction.resolved(type, updated));
    yield put(push(`/${id}`));
  } catch (error) {
    yield put(PromiseAction.rejected(type, error));
  }
}

export default function* () {
  yield takeEvery(actionTypes.LIST_GISTS, listGists);
  yield takeEvery(actionTypes.LIST_NEXT_GISTS, listNextGists);
  yield takeEvery(actionTypes.READ_GIST, readGist);
  yield takeEvery(actionTypes.CREATE_GIST, createGist);
  yield takeEvery(actionTypes.UPDATE_GIST, updateGist);
}
