import * as actionTypes from './actionTypes';
import { createReducer } from '../../infrastructure/PromiseHelper';

import GistsResponse from '../../models/GistsResponse';
import GistContentResponse from '../../models/GistContentResponse';

export const gistsResponse = createReducer(
  GistsResponse,
  actionTypes.FETCH_GISTS,
  actionTypes.RESOLVE_GISTS,
  actionTypes.REJECT_GISTS,
)

export const gistContentResponse = createReducer(
  GistContentResponse,
  actionTypes.FETCH_GIST_CONTENT,
  actionTypes.RESOLVE_GIST_CONTENT,
  actionTypes.REJECT_GIST_CONTENT,
)
