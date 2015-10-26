/**
 * Created by alejandrobarreiro on 23/10/15.
 */
angular.module('sapoApp')
  .controller('ListarProductosCtrl',
  ['$scope', 'CategoriaHandler', 'categoriaService', 'lodash', 'almacenService',
    function ($scope, CategoriaHandler, categoriaService, lodash, almacenService) {

      var arrayProductos = [],
        idCatsElegidas;

      this.init = function () {

        arrayProductos = [];
        var catHandler = new CategoriaHandler();
        $scope.categorias = [];
        idCatsElegidas = $scope.$parent.almacen.categorias;
        idCatsElegidas.forEach(function (c) {
          var cat = catHandler.getCategoria(c);
          if (cat) {
            $scope.categorias.push(cat);
            arrayProductos[cat] = [];
          }
        });
      };

      $scope.listarProductos = function (id) {

        if (arrayProductos[id]) {
          $scope.productos = arrayProductos[id];
        } else {
          categoriaService.getProductosCategoria(id).then(function (productos) {

            var productosConStock = [];
            productos.forEach(function (p) {
              p.stock = 0;
              p.catProd = id;
              productosConStock.push(p);
            });
            $scope.productos = productosConStock;
            arrayProductos[id] = productosConStock;
          });
        }
        $scope.catId = id;
      };

      $scope.agregarStockProducto = function (catProd, idProducto) {

       var index = lodash.findIndex(arrayProductos[catProd], function(prod) {
          return prod.id == idProducto;
        });
        arrayProductos[catProd][index].stock ++;

        $scope.productos = arrayProductos[catProd];
      };

      $scope.sacarStockProducto = function (catProd, idProducto) {

        var index = lodash.findIndex(arrayProductos[catProd], function(prod) {
          return prod.id == idProducto;
        });
        if (arrayProductos[catProd][index].stock > 0) {
          arrayProductos[catProd][index].stock --;
        }

        $scope.productos = arrayProductos[catProd];
      };


      $scope.confirmarProductos = function () {

        var productosResult = [];
        idCatsElegidas.forEach(function (c) {
          if (arrayProductos[c] && arrayProductos[c].length) {
            arrayProductos[c].forEach(function (p) {
              if (p.stock > 0) {
                productosResult.push({
                  productoID: p.id,
                  cantidad: p.stock
                })
              }
            })
          }
        });

        var idAlmacen = $scope.$parent.almacen.id;
        almacenService.cargarProductosAlmacen(idAlmacen, productosResult)
          .then(function(a) {
            console.log(a);
            toastr.success('Productos del almacen confirmados!');
           })
          .catch(function () {
            toastr.error('Hubo un error al dar de alta los productos.')
          });
      };

      this.init();
    }]);