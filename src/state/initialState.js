import PromiseState from '../infrastructure/PromiseState';

import OAuthTokenRepository from '../repositories/OAuthTokenRepository';

import GistCriteria from '../models/GistCriteria';

export default () => {
  const oauthTokenPresent = new OAuthTokenRepository().isPresent();
  return {
    session: oauthTokenPresent ? PromiseState.resolved() : PromiseState.INVALID,
    gistCriteria: oauthTokenPresent ? GistCriteria.MY : GistCriteria.PUBLIC,
  };
}
