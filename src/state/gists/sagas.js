import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as ownerTypes from '../../models/GistOwner';

import * as actionTypes from './actionTypes';

function* fetchGists({owner}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.getOrNull().token);
  try {
    switch (owner.type) {
      case ownerTypes.PUBLIC:
        yield put({type: actionTypes.RESOLVE_GISTS, data: yield github.findPublicGists()});
        break;
      case ownerTypes.MY:
        yield put({type: actionTypes.RESOLVE_GISTS, data: yield github.findMyGists()});
        break;
      default:
        throw new Error(`Unknown owner type: ${owner.type}`);
    }
  } catch (error) {
    yield put({type: actionTypes.REJECT_GISTS, error});
  }
}

function* fetchGistContent({id}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.getOrNull().token);
  try {
    yield put({type: actionTypes.RESOLVE_GIST_CONTENT, data: yield github.getGistContent(id)});
  } catch (error) {
    yield put({type: actionTypes.REJECT_GIST_CONTENT, error});
  }
}

function* updateGistContent({id, gist}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.getOrNull().token);
  try {
    yield put({type: actionTypes.RESOLVE_UPDATE_GIST_CONTENT, data: yield github.updateGist(id, gist)});
    yield put(push(`/${id}`));
  } catch (error) {
    yield put({type: actionTypes.REJECT_UPDATE_GIST_CONTENT, error});
  }
}

export default function* () {
  yield takeEvery(actionTypes.FETCH_GISTS, fetchGists);
  yield takeEvery(actionTypes.FETCH_GIST_CONTENT, fetchGistContent);
  yield takeEvery(actionTypes.UPDATE_GIST_CONTENT, updateGistContent);
}
