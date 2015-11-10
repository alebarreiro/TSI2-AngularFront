/**
 * Created by alejandro on 11/10/15.
 */

angular.module('sapoApp').controller('CarritoVerCtrl',
    ['almacen', '$scope', '$location', 'toastr', 'authService', 'carritoService', 'lodash',
        function (almacen, $scope, $location, toastr, authService, carritoService, lodash) {

            this.init = function () {
                $scope.almacen = almacen;
                $scope.carrito = [];
                var car = $scope.carrito;
                carritoService.getCarrito($scope.almacen.id)
                    .then(function(carrito) {
                        console.log(carrito);

                        carrito.forEach(function (c) {
                            car.push(c);
                        })

                        console.log($scope.carrito);
                    })
                    .catch(function() {

                    });
            };

            this.init();

            this.aumentarCantCompras = function(idProducto) {
                var index = lodash.findIndex($scope.carrito, function(prod) {
                    return prod.producto.id == idProducto;
                });
                $scope.carrito[index].cantidad_compras++;
                this.actualizarCarrito(index);
            }

            this.reducirCantCompras = function(idProducto) {
                var index = lodash.findIndex($scope.carrito, function(prod) {
                    return prod.producto.id == idProducto;
                });
                $scope.carrito[index].cantidad_compras--;
                this.actualizarCarrito(index);
            }

            this.aumentarTotal = function(idProducto) {
                var index = lodash.findIndex($scope.carrito, function(prod) {
                    return prod.producto.id == idProducto;
                });
                $scope.carrito[index].total++;
                this.actualizarCarrito(index);
            }

            this.reducirTotal = function(idProducto) {
                var index = lodash.findIndex($scope.carrito, function(prod) {
                    return prod.producto.id == idProducto;
                });
                $scope.carrito[index].total--;
                this.actualizarCarrito(index);
            }

            this.actualizarCarrito = function(index) {
                console.log($scope.carrito[index]);
                carritoService.agregarCarrito($scope.almacen.id, $scope.carrito[index].producto.id, $scope.carrito[index].cantidad_compras, $scope.carrito[index].total)
                    .then(function(carrito) {
                        console.log(carrito)
                    })
                    .catch(function(){

                    });
            }
        }]);
