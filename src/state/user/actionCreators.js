import * as actionTypes from './actionTypes'

export const login = () => ({type: actionTypes.LOGIN})

export const logout = () => ({type: actionTypes.LOGOUT})

export const fetchAccessToken = (code, state) => ({type: actionTypes.FETCH_ACCESS_TOKEN, code, state})
