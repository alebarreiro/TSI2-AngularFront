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

    };

    this.init();

    $scope.aumentarStockProducto = function (idProducto) {

      var index = lodash.findIndex($scope.productos, function(prod) {
          return prod.productoID == idProducto;
      });

    $scope.productos[index].cantidad++
    };

    $scope.reducirStockProducto = function (idProducto) {

        var index = lodash.findIndex($scope.productos, function(prod) {
            return prod.productoID == idProducto;
        });
        if ($scope.productos[index].cantidad > 0)
            $scope.productos[index].cantidad--;
    };

    $scope.actualizarStockProducto = function (idProducto, stock, nombre) {

        almacenService.actualizarStockAlmacen($scope.almacenId, idProducto, stock)
            .then(function(a) {
                console.log(a);
                toastr.success('Stock de ' + nombre + ' actualizado');
            })
            .catch(function () {
                toastr.error('Hubo un error al modificar el stock.')
            });
    }

  }]);