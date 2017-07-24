import OAuthTokenRepository from '../repositories/OAuthTokenRepository';

export default () => ({
  authenticated: new OAuthTokenRepository().isPresent(),
});
