import OAuthTokenRepository from '../repositories/OAuthTokenRepository';

import GistCriteria from '../models/GistCriteria';

export default () => {
  const authenticated = new OAuthTokenRepository().isPresent();
  return {
    authenticated,
    gistCriteria: authenticated ? GistCriteria.MY : GistCriteria.PUBLIC,
  };
}
