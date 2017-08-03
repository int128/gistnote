import PromiseReducer from '../../infrastructure/PromiseReducer';
import PromiseState from '../../infrastructure/PromiseState';

import * as actionTypes from './actionTypes';

import GistCriteria from '../../models/GistCriteria';
import EditingGist from '../../models/EditingGist';

export function gistCriteria(state = GistCriteria.PUBLIC, action) {
  switch (action.type) {
    case actionTypes.CHANGE_GIST_CRITERIA:
      return action.payload;
    default:
      return state;
  }
}

export const gistList = PromiseReducer(actionTypes.LIST_GISTS)

export const gist = PromiseReducer(actionTypes.READ_GIST)

export const createdGist = PromiseReducer(actionTypes.CREATE_GIST)

export const updatedGist = PromiseReducer(actionTypes.UPDATE_GIST)

export const editingGist = PromiseReducer(actionTypes.READ_GIST,
  payload => EditingGist.createFromExistentGist(payload),
  (state, action) => {
    switch (action.type) {
      case actionTypes.NEW_EDITING_GIST:
        return PromiseState.resolved(EditingGist.createNew());
      case actionTypes.CHANGE_EDITING_GIST:
        return PromiseState.resolved(action.payload);
      default:
        return state;
    }
  })
