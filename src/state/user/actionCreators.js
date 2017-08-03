import * as actionTypes from './actionTypes'

export const readUserProfile = () => ({type: actionTypes.READ_USER_PROFILE})

export const login = () => ({type: actionTypes.LOGIN})
export const logout = () => ({type: actionTypes.LOGOUT})

export const exchangeAccessToken = (code, state) => ({type: actionTypes.EXCHANGE_ACCESS_TOKEN, code, state})
