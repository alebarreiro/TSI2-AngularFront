/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('PerfilCtrl', ['authService', '$scope', 'cuentas', 'cuentaService', 'toastr', '$stateParams',
    function (authService, $scope, cuentas, cuentaService, toastr,$stateParams) {
      this.init = function () {

        var user = authService.getLoggedUser();
        $scope.cuentas = cuentas;
        $scope.usuario = user;
        $scope.urlRetornoOK = window.location.origin + '/#/dashboard/perfil/true';
        $scope.urlRetornoMAL = window.location.origin + '/#/dashboard/perfil/false';

        if ($stateParams.ok) {
          if ($stateParams.ok == 'true') {
            toastr.success("Cuenta actualizada con éxito!");
          } else if ($stateParams.ok == 'false') {
            toastr.warning("Transacción rechazada por el usuario.");
          }
        }
      };

      $scope.seleccionarCuenta = function (idCuenta) {

        cuentaService.actualizarCuentaUsuario(idCuenta)
          .then(function(){
            toastr.success("Cuenta actualizada con éxito!");
          })
          .catch(function(){
            toastr.warning("No fue posible actualizar tu cuenta en este momento.");
          });
      };

      this.init();
    }]);
