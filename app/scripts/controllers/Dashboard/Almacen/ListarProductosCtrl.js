/**
 * Created by alejandrobarreiro on 23/10/15.
 */
angular.module('sapoApp')
  .controller('ListarProductosCtrl', [ '$scope', function ($scope) {

    this.init = function() {

      console.log('init');

    };

    $scope.categorias = $scope.$parent.almacen.categorias;

    $scope.listarProductos = function (id) {
      console.log("holaaa");
      $scope.catId = id;
    };

    this.init();
  }]);