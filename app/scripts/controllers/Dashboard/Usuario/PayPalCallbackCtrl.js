/**
 * Created by alejandrobarreiro on 18/11/15.
 */
angular.module('sapoApp')
  .controller('PayPalCallbackCtrl', [ '$scope','toastr', '$stateParams',
    function ($scope, toastr,$stateParams) {
      this.init = function () {

        debugger;
        if ($stateParams.ok) {
          if ($stateParams.ok == 'true') {
            toastr.success("Cuenta actualizada con éxito!");
            $scope.resultado = 'OK!';
          } else if ($stateParams.ok == 'false') {
            toastr.warning("Transacción rechazada por el usuario.");
            $scope.resultado = 'ERROR!';
          }
        }
      };

      this.init();
    }]);
