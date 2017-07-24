import { takeEvery, put } from 'redux-saga/effects';
import GitHub from '../../infrastructure/GitHub';
import OAuthTokenRepository from '../../repositories/OAuthTokenRepository';

import * as actionTypes from './actionTypes';

function* fetchGists({isPublic}) {
  const oauthTokenRepository = new OAuthTokenRepository();
  const github = new GitHub(oauthTokenRepository.getOrNull().token);
  try {
    if (isPublic) {
      yield put({type: actionTypes.RESOLVE_GISTS, data: yield github.findPublicGists()});
    } else {
      yield put({type: actionTypes.RESOLVE_GISTS, data: yield github.findUserGists()});
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

export default function* () {
  yield takeEvery(actionTypes.FETCH_GISTS, fetchGists);
  yield takeEvery(actionTypes.FETCH_GIST_CONTENT, fetchGistContent);
}
