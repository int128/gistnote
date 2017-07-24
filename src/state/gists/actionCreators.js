import * as actionTypes from './actionTypes'

export const fetchPublicGists = () => ({type: actionTypes.FETCH_GISTS, isPublic: true})

export const fetchUserGists = () => ({type: actionTypes.FETCH_GISTS, isPublic: false})

export const fetchGistContent = id => ({type: actionTypes.FETCH_GIST_CONTENT, id})
