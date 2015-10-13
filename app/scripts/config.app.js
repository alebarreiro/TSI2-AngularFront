/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .config(['$httpProvider', function ($httpProvider) {
    // http interceptor when not authorized or authenticated
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('HttpInterceptor');
      }
    ]);
  }])
  .factory('HttpInterceptor', ['REST_API', function (REST_API) {
    return {
      request: function (config) {
        config.headers['Ocp-Apim-Subscription-Key'] = REST_API.OCP_KEY;
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
    };
  }]);