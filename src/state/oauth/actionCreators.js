import * as actionTypes from './actionTypes'

export const login = () => ({type: actionTypes.LOGIN})
export const logout = () => ({type: actionTypes.LOGOUT})

export const acquireSession = (code, state) => ({type: actionTypes.ACQUIRE_SESSION, code, state})
export const invalidateSession = () => ({type: actionTypes.INVALIDATE_SESSION})
