import { routerReducer } from 'react-router-redux';

import * as gists from './gists/reducers';
import * as user from './user/reducers';
import * as oauth from './oauth/reducers';

export default {
  routing: routerReducer,
  ...gists,
  ...user,
  ...oauth,
};
