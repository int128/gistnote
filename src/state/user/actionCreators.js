import * as actionTypes from './actionTypes'

export const login = () => ({type: actionTypes.LOGIN})

export const fetchAccessToken = (code, state) => ({type: actionTypes.FETCH_ACCESS_TOKEN, code, state})

export const fetchUser = () => ({type: actionTypes.FETCH_USER})

export const logout = () => ({type: actionTypes.LOGOUT})
