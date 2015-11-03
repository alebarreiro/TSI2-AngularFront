/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .constant('REST_API', {
    BASE_URL: 'https://sapo.azure-api.net/sapo/',
    WEBSCRAP_URL: 'https://sapo.azure-api.net/nodejs/',
    OCP_KEY: '9f86432ae415401db0383f63ce64c4fe'
  })
  .constant('CURRENT_LOGGED_IN_USER', 'currentLoggedInUser')
  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    signout: 'auth-signout'
  });

