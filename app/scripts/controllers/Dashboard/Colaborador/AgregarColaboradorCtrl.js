/**
 * Created by alejandrobarreiro on 25/10/15.
 */
angular.module('sapoApp')
  .controller('AgregarColaboradorCtrl', ['$scope', 'usuarioService', 'toastr', function ($scope, usuarioService) {

    $scope.usuario = {};

    this.init = function () {

    };

    $scope.$watch('usuario.id', function() {

      
    });

    $scope.agregarColaborador = function () {

    };

    this.init();
  }]);