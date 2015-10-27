/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('HeaderController', ['$rootScope', 'authService', 'AUTH_EVENTS', function($rootScope, authService, AUTH_EVENTS) {
    this.init = function() {};

    this.onClickLogout = function() {
      //Por ahora no lo hacemos en facebook porque estamos en localhost..
      //authService.doFacebookLogout(function(response){
      //})
      $rootScope.$emit(AUTH_EVENTS.signout);
    };

    this.init();
  }]);
