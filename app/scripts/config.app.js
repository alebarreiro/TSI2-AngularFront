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
  }]
)
  .factory('HttpInterceptor', ['REST_API', function (REST_API) {
    return {
      request: function (config) {
        config.headers['Ocp-Apim-Subscription-Key'] = REST_API.OCP_KEY;
        config.headers['Content-Type'] = 'application/json';
        return config;
      },
    };
  }]
)
  .run(
  ['$rootScope', '$state', '$stateParams', 'authService', 'AUTH_EVENTS',
    function ($rootScope, $state, $stateParams, authService, AUTH_EVENTS) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      // El router cambia de estado, chequemaos si el usuario esta autorizado para el nuevo estado
      $rootScope.$on('$stateChangeStart', function (event, nextState) {

        if (nextState.name !== 'login') {
          // Si el proximo estado no es el login, vemos si necesita autenticación y/o autorización
          if (!authService.isAuthorizedInState(nextState)) {
            console.log('NO TIENE PERMITIDO SEGUIR');
            // No vamos al proximo estado
            event.preventDefault();
            //Los eventos se atrapan en authService
            if (authService.isLoggedIn()) {
              $rootScope.$emit(AUTH_EVENTS.notAuthorized, nextState);
            } else {
              $rootScope.$emit(AUTH_EVENTS.notAuthenticated);
            }
          }
        }
      });
    }
  ]
);
