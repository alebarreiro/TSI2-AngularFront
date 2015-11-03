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

    }]);
