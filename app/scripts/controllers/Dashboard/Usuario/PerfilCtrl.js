/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('PerfilCtrl', [ 'authService', '$scope', 'cuentas', function(authService, $scope, cuentas) {
    this.init = function() {
      var user = authService.getLoggedUser();

      console.log(cuentas);
      $scope.cuentas = cuentas;
      $scope.usuario = user;
    };

    this.init();
  }]);
