import * as actionTypes from './actionTypes';
import { createPromiseReducer } from '../../infrastructure/PromiseHelper';

import GistOwner from '../../models/GistOwner';

export function gistsOwner(state = GistOwner.PUBLIC, action) {
  switch (action.type) {
    case actionTypes.SELECT_GISTS_OWNER:
      return action.owner;
    default:
      return state;
  }
}

export const gistsResponse = createPromiseReducer(
  actionTypes.FETCH_GISTS,
  actionTypes.RESOLVE_GISTS,
  actionTypes.REJECT_GISTS,
)

export const gistContentResponse = createPromiseReducer(
  actionTypes.FETCH_GIST_CONTENT,
  actionTypes.RESOLVE_GIST_CONTENT,
  actionTypes.REJECT_GIST_CONTENT,
  actionTypes.DESTROY_GIST_CONTENT,
)
