import OAuthTokenRepository from '../repositories/OAuthTokenRepository';

export default () => {
  return {
    session: new OAuthTokenRepository().getAsPromiseState(),
  };
}
