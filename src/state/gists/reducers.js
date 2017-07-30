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

export function fetchedGists(state = PromiseResponse.INVALID, action) {
  switch (action.type) {
    case actionTypes.FETCH_GISTS:
      return PromiseResponse.LOADING;
    case actionTypes.FETCH_GISTS_RESOLVED:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.FETCH_GISTS_REJECTED:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.FETCH_NEXT_GISTS_RESOLVED:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.FETCH_NEXT_GISTS_REJECTED:
      return state;
    default:
      return state;
  }
}

export function fetchedGist(state = PromiseResponse.INVALID, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.FETCH_GIST_RESOLVED:
      return PromiseResponse.createResolved(action.data);
    case actionTypes.FETCH_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.DESTROY_FETCHED_GIST:
      return PromiseResponse.INVALID;
    default:
      return state;
  }
}

export function editingGist(state = PromiseResponse.INVALID, action) {
  switch (action.type) {
    case actionTypes.FETCH_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.FETCH_GIST_RESOLVED:
      return PromiseResponse.createResolved(EditingGist.createFromExistentGist(action.data));
    case actionTypes.FETCH_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.CREATE_EDITING_GIST:
      return PromiseResponse.createResolved(EditingGist.createNew());
    case actionTypes.CHANGE_EDITING_GIST:
      return PromiseResponse.createResolved(action.value);
    case actionTypes.DESTROY_EDITING_GIST:
      return PromiseResponse.INVALID;
    default:
      return state;
  }
}

export function createdGist(state = PromiseResponse.INVALID, action) {
  switch (action.type) {
    case actionTypes.CREATE_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.CREATE_GIST_RESOLVED:
      return PromiseResponse.createResolved();
    case actionTypes.CREATE_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.DESTROY_CREATED_GIST:
      return PromiseResponse.INVALID;
    default:
      return state;
  }
}

export function updatedGist(state = PromiseResponse.INVALID, action) {
  switch (action.type) {
    case actionTypes.UPDATE_GIST:
      return PromiseResponse.LOADING;
    case actionTypes.UPDATE_GIST_RESOLVED:
      return PromiseResponse.createResolved();
    case actionTypes.UPDATE_GIST_REJECTED:
      return PromiseResponse.createRejected(action.error);
    case actionTypes.DESTROY_UPDATED_GIST:
      return PromiseResponse.INVALID;
    default:
      return state;
  }
}
