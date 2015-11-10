/**
 * Created by alejandro on 11/9/15.
 */

angular.module('sapoApp')
    .service('carritoService', ['$q', 'Carrito', function ($q, Carrito) {

        this.init = function () {
        };

        this.getCarrito = function(idCarrito) {
            var deferred = $q.defer();
            Carrito.getCarrito({ id: idCarrito }, {}, function (carrito) {
                deferred.resolve(carrito);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


        this.agregarCarrito = function(idCarrito, idProducto, cantCompras, total) {
            var deferred = $q.defer();
            Carrito.agregarCarrito({ id: idCarrito }, {
                cantidad_compras: cantCompras,
                total: total,
                producto: idProducto
            }, function (producto) {
                deferred.resolve(producto);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.borrarCarrito = function(idCarrito) {
            var deferred = $q.defer();
            Carrito.borrarCarrito({ id: idCarrito }, {}, function (carrito) {
                deferred.resolve(carrito);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


    }]);