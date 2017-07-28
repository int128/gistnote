import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as ownerTypes from '../../models/GistOwner';

import * as actionTypes from './actionTypes';

function* fetchGists({owner}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    let data;
    switch (owner.type) {
      case ownerTypes.PUBLIC:
        data = yield github.findPublicGists();
        break;
      case ownerTypes.MY:
        data = yield github.findMyGists();
        break;
      default:
        throw new Error(`owner.type must be one of ${ownerTypes} but ${owner.type}`);
    }
    yield put({type: actionTypes.FETCH_GISTS_RESOLVED, data});
  } catch (error) {
    yield put({type: actionTypes.FETCH_GISTS_REJECTED, error});
  }
}

function* fetchGist({id}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const data = yield github.getGistContent(id);
    yield put({type: actionTypes.FETCH_GIST_RESOLVED, data});
  } catch (error) {
    yield put({type: actionTypes.FETCH_GIST_REJECTED, error});
  }
}

function* createGist({gist}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const data = yield github.createGist(gist);
    yield put({type: actionTypes.CREATE_GIST_RESOLVED, data});
    yield put(push(`/${data.id}`));
  } catch (error) {
    yield put({type: actionTypes.CREATE_GIST_REJECTED, error});
  }
}

function* updateGist({id, gist}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.get());
  try {
    const data = yield github.updateGist(id, gist);
    yield put({type: actionTypes.UPDATE_GIST_RESOLVED, data});
    yield put(push(`/${data.id}`));
  } catch (error) {
    yield put({type: actionTypes.UPDATE_GIST_REJECTED, error});
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_GISTS, fetchGists);
  yield takeEvery(actionTypes.FETCH_GIST, fetchGist);
  yield takeEvery(actionTypes.CREATE_GIST, createGist);
  yield takeEvery(actionTypes.UPDATE_GIST, updateGist);
}
