import * as actionTypes from './actionTypes';

import Gists from '../../models/Gists';

export function gists(state = Gists.loading(), action) {
  switch (action.type) {
    case actionTypes.FETCH_PUBLIC_GISTS:
      return Gists.loading();
    case actionTypes.RECEIVE_PUBLIC_GISTS:
      return action.gists;
    default:
      return state;
  }
}
