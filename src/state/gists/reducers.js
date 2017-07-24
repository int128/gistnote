import * as actionTypes from './actionTypes';
import { createPromiseReducer } from '../../infrastructure/PromiseHelper';

export const gistsResponse = createPromiseReducer(
  actionTypes.FETCH_GISTS,
  actionTypes.RESOLVE_GISTS,
  actionTypes.REJECT_GISTS,
)

export const gistContentResponse = createPromiseReducer(
  actionTypes.FETCH_GIST_CONTENT,
  actionTypes.RESOLVE_GIST_CONTENT,
  actionTypes.REJECT_GIST_CONTENT,
)
