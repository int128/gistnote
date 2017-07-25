import * as actionTypes from './actionTypes';

import GistOwner from '../../models/GistOwner';
import EditingGistContent from '../../models/EditingGistContent';
import PromiseResponse from '../../models/PromiseResponse';

export function gistsOwner(state = GistOwner.PUBLIC, action) {
  switch (action.type) {
    case actionTypes.SELECT_GISTS_OWNER:
      return action.owner;
    default:
      return state;
  }
}

export function gistsResponse(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GISTS:
      return PromiseResponse.LOADING;
    case actionTypes.RESOLVE_GISTS:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.REJECT_GISTS:
      return PromiseResponse.createRejected(action.error);
    default:
      return state;
  }
}

export function gistContentResponse(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST_CONTENT:
      return PromiseResponse.LOADING;
    case actionTypes.RESOLVE_GIST_CONTENT:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.REJECT_GIST_CONTENT:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.DESTROY_GIST_CONTENT:
      return PromiseResponse.LOADING;
    default:
      return state;
  }
}

export function editingGistContent(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST_CONTENT:
      return PromiseResponse.LOADING;
    case actionTypes.RESOLVE_GIST_CONTENT:
      return PromiseResponse.createResolved(EditingGistContent.createFromGistContent(action.data));
    case actionTypes.REJECT_GIST_CONTENT:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.DESTROY_GIST_CONTENT:
      return PromiseResponse.LOADING;
    case actionTypes.CHANGE_EDITING_GIST_CONTENT:
      return PromiseResponse.createResolved(action.value);
    default:
      return state;
  }
}
