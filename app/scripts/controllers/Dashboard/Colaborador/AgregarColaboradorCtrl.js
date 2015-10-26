/**
 * Created by alejandrobarreiro on 25/10/15.
 */
angular.module('sapoApp')
  .controller('AgregarColaboradorCtrl', ['$scope', 'usuarioService', 'toastr', function ($scope, usuarioService, toastr) {

    $scope.searchterm = "";
    $scope.usuarios = {};

    this.init = function () {

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

    };

    $scope.agregarColaborador = function () {

    };

    this.init();
  }]);