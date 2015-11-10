angular.module('sapoApp')
  .controller('ListarColaboradoresCtrl', ['$scope', 'usuarioService', 'toastr', 'almacenes', 'almacenService',
    function ($scope,  usuarioService, toastr, almacenes, almacenService) {

      $scope.usuarios = {};
      var almacenSeleccionada;

      this.init = function () {
        $scope.almacenes = almacenes;
        $scope.colaboradores = [];
      };

      $scope.$watch('almacenId', function() {
        if ($scope.almacenId) {
          almacenSeleccionada = $scope.almacenId.replace(/ /g,'');
          console.log(almacenSeleccionada);
          if (almacenSeleccionada) {
            almacenService.getColaboradoresAlmacen(almacenSeleccionada).then(function(colaboradores){
              $scope.colaboradores = colaboradores;
            })
          }
        }
      });

      this.init();
    }]);