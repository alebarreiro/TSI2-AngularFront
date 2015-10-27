/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('PerfilCtrl', ['authService', '$scope', 'cuentas', 'cuentaService', 'toastr',
    function (authService, $scope, cuentas, cuentaService, toastr) {
      this.init = function () {

        var user = authService.getLoggedUser();
        $scope.cuentas = cuentas;
        $scope.usuario = user;
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
