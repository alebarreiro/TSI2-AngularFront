/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('ProductosAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'ProductoHandler', 'CategoriaHandler', 'categoriaService', 'webscrapService', 'usuarioService', 'authService',
        function (almacen, $scope, almacenService, toastr, lodash, ProductoHandler, CategoriaHandler, categoriaService, webscrapService, usuarioService, authService) {

            this.init = function () {
                $scope.almacen = almacen;
                $scope.productos = almacen.stockproductos;
            };

            this.init();

            // *** FUNCIONES DE PRODUCTOS *** //

            this.aumentarStockProducto = function (idProducto) {

                var index = lodash.findIndex($scope.productos, function(prod) {
                    return prod.productoID == idProducto;
                });

                $scope.productos[index].cantidad++;
            };

            this.reducirStockProducto = function (idProducto) {

                var index = lodash.findIndex($scope.productos, function(prod) {
                    return prod.productoID == idProducto;
                });
                if ($scope.productos[index].cantidad > 0)
                    $scope.productos[index].cantidad--;
            };

            this.actualizarStockProducto = function (idProducto, stock, nombre) {
                console.log(idProducto);

                almacenService.actualizarStockAlmacen($scope.almacen.id, idProducto, stock)
                    .then(function(a) {
                        console.log(a);
                        toastr.success('Stock de ' + nombre + ' actualizado');
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al modificar el stock.')
                    });
            }

            //Crea un producto específico.
            this.crearProducto = function (nombreProducto, descProducto, idCategoria) {
                console.log("nombreProducto: " + nombreProducto + " descProducto " + descProducto);
                var that = this;
                //Invoca al service para hacer el POST de la categoria.
                this.categoria = categoriaService.createProducto(nombreProducto, descProducto, idCategoria)
                    .then(function(a) {
                        console.log(a);
                        toastr.success('Producto ' + nombreProducto + ' creado.');
                        a.cantidad = 0;
                        $scope.productos.push(a);
                        var param = [{"productoID": a.id, "cantidad": a.cantidad}];
                        that.cargarProducto(param);
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al dar de alta el producto.')
                    });
            };

            //Carga una lista de productos en el almacén.
            this.cargarProducto = function(productos) {
                almacenService.cargarProductosAlmacen($scope.almacen.id, productos)
                    .then(function(a) {
                        console.log(a);
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al cargar el producto.');
                    });
            }

        }]);