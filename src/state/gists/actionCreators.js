import * as actionTypes from './actionTypes'

import GistOwner from '../../models/GistOwner';

export const selectPublicGists = () => ({type: actionTypes.SELECT_GISTS_OWNER, owner: GistOwner.PUBLIC})
export const selectMyGists = () => ({type: actionTypes.SELECT_GISTS_OWNER, owner: GistOwner.MY})

export const fetchPublicGists = () => ({type: actionTypes.FETCH_GISTS, owner: GistOwner.PUBLIC})
export const fetchMyGists = () => ({type: actionTypes.FETCH_GISTS, owner: GistOwner.MY})

export const fetchGist = id => ({type: actionTypes.FETCH_GIST, id})
export const destroyFetchedGist = () => ({type: actionTypes.DESTROY_FETCHED_GIST})

export const changeEditingGist = value => ({type: actionTypes.CHANGE_EDITING_GIST, value})
export const destroyEditingGist = () => ({type: actionTypes.DESTROY_EDITING_GIST})
export const updateGist = (id, gist) => ({type: actionTypes.UPDATE_GIST, id, gist})
