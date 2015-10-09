/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .controller('CrearAlmacenesCtrl', [ '$scope', function ($scope) {

    this.init = function() {

    };

    $scope.crearAlmacen = function() {

      console.log($scope.almacen.nombre);
    };

    this.init();
  }]);