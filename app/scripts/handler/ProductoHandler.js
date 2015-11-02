/**
 * Created by alejandro on 11/2/15.
 */
'use strict';
angular.module('sapoApp')
    .factory('ProductoHandler', [function () {

        var ProductoHandler = function () {
            this.init();
        };

        ProductoHandler.prototype.productos = {};

        ProductoHandler.prototype.init = function () {};

        ProductoHandler.prototype.setProductos = function (productos) {
            ProductoHandler.prototype.productos = productos;
        };

        ProductoHandler.prototype.getProductos = function () {
            return ProductoHandler.prototype.productos;
        };

        ProductoHandler.prototype.getProductos = function(id) {
            var producto,
                productos = ProductoHandler.prototype.getProductos();

            if (productos) {
                productos.forEach(function (c) {
                    if (p && p.id == id) {
                        producto = p;
                        return;
                    }
                });
                return producto;
            } else {
                return undefined;
            }
        };

        return ProductoHandler;
    }]);
