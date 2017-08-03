import PromiseAction from '../../infrastructure/PromiseAction';

import * as actionTypes from './actionTypes'

export const changeGistCriteria = payload => ({type: actionTypes.CHANGE_GIST_CRITERIA, payload})

export const listGists = owner => ({type: actionTypes.LIST_GISTS, owner})
export const listNextGists = pagenation => ({type: actionTypes.LIST_NEXT_GISTS, pagenation})

export const readGist = id => ({type: actionTypes.READ_GIST, id})
export const createGist = payload => ({type: actionTypes.CREATE_GIST, payload})
export const updateGist = payload => ({type: actionTypes.UPDATE_GIST, payload})
export const invalidateGist = () => PromiseAction.invalidate(actionTypes.READ_GIST)

export const newEditingGist = () => ({type: actionTypes.NEW_EDITING_GIST})
export const changeEditingGist = payload => ({type: actionTypes.CHANGE_EDITING_GIST, payload})
