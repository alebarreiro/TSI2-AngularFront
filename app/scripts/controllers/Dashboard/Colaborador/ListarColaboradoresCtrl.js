angular.module('sapoApp')
  .controller('ListarColaboradoresCtrl', ['$scope', 'usuarioService', 'toastr', 'almacenes', 'AlmacenHandler',
    function ($scope,  usuarioService, toastr, almacenes, AlmacenHandler) {

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
        }
      });

      this.init();
    }]);