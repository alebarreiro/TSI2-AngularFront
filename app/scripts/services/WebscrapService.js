/**
 * Created by alejandro on 11/3/15.
 */

angular.module('sapoApp')
    .service('webscrapService', ['$q', 'Webscrap', 'Usuario', 'authService', 'Categoria', function ($q, Webscrap, Usuario, authService, Categoria) {

        this.init = function () {};

        this.getCategoriasML = function() {
            var deferred = $q.defer();
            console.log('buscando categorias de mercadolibre');
            Webscrap.getCategorias({}, {}, function (categorias) {
                deferred.resolve(categorias);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.searchCategoriasML = function(idCategoria) {
            var deferred = $q.defer();
            console.log('Buscando en la categoria ' + idCategoria + ' de mercadolibre');
            Webscrap.searchCategoria({}, {
                category: idCategoria,
                limit: 10,
                offset: 1
            }, function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.addProductosML = function(idProducto, idCategoria) {
            var deferred = $q.defer();
            console.log('Agregando el producto ' + idProducto + ' de mercadolibre a la categoria ' + idCategoria    );
            var prod = [{"id": idProducto, "generico": false, "categoria": idCategoria }];
            Webscrap.addProductos({}, prod, function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);
