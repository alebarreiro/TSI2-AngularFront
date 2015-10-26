/**
 * Created by alejandrobarreiro on 25/10/15.
 */
angular.module('sapoApp')
  .controller('AgregarColaboradorCtrl', ['$scope', 'usuarioService', 'toastr', 'almacenes',
    function ($scope, usuarioService, toastr, almacenes) {

    $scope.searchterm = "";
    $scope.usuarios = {};
    $scope.usuarioSeleccionado = "";
    var usuarioSeleccionado;

    this.init = function () {
      $scope.almacenes = almacenes;
    };

    $scope.$watch('searchterm', function() {

      var searchTerm = $scope.searchterm;
      if (searchTerm && searchTerm.length) {
        usuarioService.buscarUsuario(searchTerm)
          .then(function (searchResult) {

            $scope.usuarios = searchResult;
          })
          .catch(function () {

            toastr.error('Hubo un error al realizar la busqueda.')
          })
      }
    });

    $scope.seleccionarUsuario = function (userId) {

      $scope.usuarioSeleccionado = "Usuario seleccionado: " + userId;
      usuarioSeleccionado = userId;
      console.log(userId);
    };

    $scope.agregarColaborador = function () {
      var almacenSeleccionada = $scope.almacenId;

      if (!almacenSeleccionada)
        toastr.warning("Por favor, seleccione un almacen");
      else if (!usuarioSeleccionado)
        toastr.warning("Por favor, seleccione un usuario");
      else {

      }
    };

    this.init();
  }]);