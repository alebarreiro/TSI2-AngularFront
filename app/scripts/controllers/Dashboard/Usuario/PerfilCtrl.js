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


        angular.forEach(cuentas, function (c) {
          if (c.precio == 0) {
            $scope.cuentaFree = c;
          }
        });

        if ($stateParams.ok) {
          if ($stateParams.ok == 'true') {
            toastr.success("Cuenta actualizada con éxito!");
          } else if ($stateParams.ok == 'false') {
            toastr.warning("Transacción rechazada por el usuario.");
          }
        }
      };

      $scope.seleccionarCuenta = function (cuenta) {

        cuentaService.actualizarCuentaUsuario(cuenta.cuentaID)
          .then(function(){
            $scope.usuario.cuenta = cuenta;
            authService.setLoggedInUser($scope.usuario);
            toastr.success("Cuenta actualizada con éxito!");
          })
          .catch(function(){
            toastr.warning("No fue posible actualizar tu cuenta en este momento.");
          });
      };

      this.init();
    }]);
