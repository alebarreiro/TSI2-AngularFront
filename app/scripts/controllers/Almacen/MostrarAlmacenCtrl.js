angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'ProductoHandler', 'CategoriaHandler',
    function (almacen, $scope, almacenService, toastr, lodash, ProductoHandler, CategoriaHandler) {

    this.init = function () {
      console.log(almacen);
      $scope.almacenId = almacen.id;
      $scope.almacen = almacen;
      $scope.productos = almacen.stockproductos;
      $scope.categorias = almacen.categorias;
      $scope.colaboradores = almacen.colaboradores;
        console.log($scope.productos);
        console.log($scope.categorias);

    };

    this.init();

    $scope.aumentarStockProducto = function (idProducto) {

      var index = lodash.findIndex($scope.productos, function(prod) {
          return prod.productoID == idProducto;
      });
      console.log(index)

    $scope.productos[index].cantidad++
    };

    $scope.reducirStockProducto = function (idProducto) {

        var index = lodash.findIndex($scope.productos, function(prod) {
            return prod.productoID == idProducto;
        });
        console.log(index)
        if ($scope.productos[index].cantidad > 0)
            $scope.productos[index].cantidad--;
    };

  }]);