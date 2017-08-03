import PromiseReducer from '../../infrastructure/PromiseReducer';

import * as actionTypes from './actionTypes';

export const userProfile = PromiseReducer(actionTypes.READ_USER_PROFILE)

export const authenticated = (state = false) => state
