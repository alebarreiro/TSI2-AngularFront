/**
 * Created by alejandrobarreiro on 23/10/15.
 */
angular.module('sapoApp')
  .controller('ListarProductosCtrl', ['$scope', 'CategoriaHandler', 'categoriaService',
    function ($scope, CategoriaHandler, categoriaService) {

      var arrayProductos = [];

      this.init = function () {

        var that = this;

        arrayProductos = [];
        var catHandler = new CategoriaHandler();
        $scope.categorias = [];
        var idCatsElegidas = $scope.$parent.almacen.categorias;
        idCatsElegidas.forEach(function (c) {
          console.log('iterando ' + c);
          var cat = catHandler.getCategoria(c);
          if (cat) {
            $scope.categorias.push(cat);
            arrayProductos[cat] = [];
          }
        });
      };

      $scope.listarProductos = function (id) {
        var that = this;
        console.log("holaa listar PRoductos");
        if (arrayProductos[id]) {
          console.log('prods cacheados');
          console.log(arrayProductos[id]);
          $scope.productos = arrayProductos[id];
        } else {
          categoriaService.getProductosCategoria(id).then(function (productos) {

            var productosConStock = [];
            productos.forEach(function (p) {
              p.stock = 0;
              p.catProd = id;
              productosConStock.push(p);
            });
            console.log(productosConStock);
            $scope.productos = productosConStock;
            arrayProductos[id] = productosConStock;
          });
        }
        $scope.catId = id;

      };

      $scope.agregarStockProducto = function (catProd, idProducto) {
        console.log(arrayProductos[catProd]);
      };

      $scope.sacarStockProducto = function (catProd, idProducto) {
        console.log(arrayProductos[catProd]);
        //this.arrayProductos[idProducto].stock = (this.arrayProductos[idProducto] && this.arrayProductos[idProducto].stock > 0) ?  this.arrayProductos[idProducto].stock-- : 0;
      };

      this.init();
    }]);