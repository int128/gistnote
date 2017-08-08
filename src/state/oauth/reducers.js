import * as actionTypes from './actionTypes';

export const authenticated = (state = false, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
}
