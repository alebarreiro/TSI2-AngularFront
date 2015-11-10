/**
 * Created by alejandro on 11/10/15.
 */

angular.module('sapoApp').controller('CarritoAgregarCtrl',
    ['almacen', '$scope', '$location', 'toastr', 'authService', 'categoriaService', 'carritoService',
        function (almacen, $scope, $location, toastr, authService, categoriaService, carritoService) {

            this.init = function () {
                $scope.almacen = almacen;
                $scope.categorias = almacen.categorias;
                $scope.productos = [];
            };

            this.init();

            this.listarProductos = function(idCategoria) {
                $scope.idCategoria = idCategoria;
                categoriaService.getProductosCatAlmacen($scope.almacen.id,idCategoria)
                    .then(function (productos) {
                        $scope.productos = [];
                        var productosConStock = $scope.productos;
                        productos.forEach(function (p) {
                            p.producto.cantidad = p.cantidad;
                            productosConStock.push(p.producto);
                        });
                    });
            }

            this.agregarProductoCarrito = function(idProducto) {
                carritoService.agregarCarrito($scope.almacen.id, idProducto, 0, 0)
                    .then(function(carrito) {
                        console.log(carrito)
                    })
                    .catch(function(){

                    });
            }

        }]);
