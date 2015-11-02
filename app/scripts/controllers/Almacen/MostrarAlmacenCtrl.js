angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'ProductoHandler',
    function (almacen, $scope, almacenService, toastr, lodash, ProductoHandler) {

    this.init = function () {
      console.log(almacen);
      $scope.almacenId = almacen.id;
      $scope.almacen = almacen;
      $scope.productos = almacen.stockproductos;
      $scope.categorias = almacen.categorias;
      $scope.colaboradores = almacen.colaboradores;
    };

    this.init();

    $scope.agregarStockProducto = function (idProducto) {


      $scope.productos[idProducto].cantidad ++;
    };
  }]);