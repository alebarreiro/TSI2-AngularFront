/**
 * Created by alejandrobarreiro on 23/10/15.
 */
angular.module('sapoApp')
  .controller('ListarProductosCtrl', [ '$scope', 'CategoriaHandler', function ($scope, CategoriaHandler) {

    this.init = function() {

      console.log('init');
      var catHandler = new CategoriaHandler();
      $scope.categorias = [];
      var idCatsElegidas = $scope.$parent.almacen.categorias;

      idCatsElegidas.forEach(function (c) {
        console.log('iterando ' + c);
        var cat = catHandler.getCategoria(c);
        if (cat) $scope.categorias.push(cat);
      });

      console.log($scope.categorias);
    };

    $scope.listarProductos = function (id) {
      console.log("holaaa");
      $scope.catId = id;
    };

    this.init();
  }]);