/**
 * Created by alejandrobarreiro on 6/11/15.
 */
angular.module('sapoApp').controller('CarritoCtrl',
  ['almacen', '$scope', '$location', 'toastr', 'authService', 'carritoService',
    function (almacen, $scope, $location, toastr, authService, carritoService) {

      this.init = function () {
        $scope.almacen = almacen;
      };

      this.init();


    }]);