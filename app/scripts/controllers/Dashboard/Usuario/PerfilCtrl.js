/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('PerfilCtrl', ['authService', '$scope', 'cuentas', 'cuentaService', 'toastr', '$stateParams', 'cuentaUsuario',
    function (authService, $scope, cuentas, cuentaService, toastr,$stateParams, cuentaUsuario) {
      this.init = function () {

        var user = authService.getLoggedUser();
        $scope.cuentas = cuentas;
        user.cuenta = cuentaUsuario;
        $scope.usuario = user;
        authService.setLoggedInUser(user);
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
