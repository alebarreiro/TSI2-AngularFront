/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('PerfilCtrl', [ 'authService', '$scope', function(authService, $scope) {
    this.init = function() {
      var user = authService.getLoggedUser();
      console.log(user);

      $scope.usuario = user;
    };

    this.init();
  }]);
