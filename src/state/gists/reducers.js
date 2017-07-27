import * as actionTypes from './actionTypes';
import { RESOLVE_USER, REJECT_USER } from '../user/actionTypes';

import GistOwner from '../../models/GistOwner';
import EditingGist from '../../models/EditingGist';
import PromiseResponse from '../../models/PromiseResponse';

export function gistsOwner(state = GistOwner.PUBLIC, action) {
  switch (action.type) {
    case actionTypes.SELECT_GISTS_OWNER:
      return action.owner;
    case RESOLVE_USER:
      return GistOwner.MY;
    case REJECT_USER:
      return GistOwner.PUBLIC;
    default:
      return state;
  }
}

export function fetchedGists(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GISTS:
      return PromiseResponse.LOADING;
    case actionTypes.FETCH_GISTS_RESOLVED:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.FETCH_GISTS_REJECTED:
      return PromiseResponse.createRejected(action.error);
    default:
      return state;
  }
}

export function fetchedGist(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST:
    case actionTypes.DESTROY_FETCHED_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.FETCH_GIST_RESOLVED:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.FETCH_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    default:
      return state;
  }
}

export function editingGist(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST:
    case actionTypes.DESTROY_FETCHED_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.FETCH_GIST_RESOLVED:
      return PromiseResponse.createResolved(EditingGist.createFromGistContent(action.data));
    case actionTypes.FETCH_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.CHANGE_EDITING_GIST:
      return PromiseResponse.createResolved(action.value);
    default:
      return state;
  }
}

export function updatedGist(state = PromiseResponse.LOADING, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST_RESOLVED:
      return PromiseResponse.createResolved();
    case actionTypes.UPDATE_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.UPDATE_GIST_RESOLVED:
      return PromiseResponse.createResolved();
    case actionTypes.UPDATE_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    default:
      return state;
  }
}
