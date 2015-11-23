/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .constant('REST_API', {
    BASE_URL: 'http://sapo-backendrs.rhcloud.com/openshiftproject/rest/',
    WEBSCRAP_URL: 'http://nodejs4tsi2-backendrs.rhcloud.com/',
    OCP_KEY: '9f86432ae415401db0383f63ce64c4fe',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/sapo/image/upload',
    CLOUDINARY_API_KEY: '112152826636563'

  })
  .constant('CURRENT_LOGGED_IN_USER', 'currentLoggedInUser')
  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    signout: 'auth-signout'
  });

