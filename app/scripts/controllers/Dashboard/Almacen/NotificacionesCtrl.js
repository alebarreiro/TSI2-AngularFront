/**
 * Created by alejandrobarreiro on 7/11/15.
 */

angular.module('sapoApp')
  .controller('NotificacionesCtrl', ['$scope', 'almacenService', 'usuarioService', 'toastr', 'almacenes',
    function ($scope, almacenService, usuarioService, toastr, almacenes) {

      $scope.usuarios = {};
      var almacenSeleccionada;

      this.init = function () {
        $scope.almacenes = almacenes;
      };


      $scope.seleccionarAlmacen = function (almacen) {
        console.log(almacen)
      };

      $scope.$watch('almacenId', function() {
        console.log($scope.almacenId);
      });


      this.init();
    }]);