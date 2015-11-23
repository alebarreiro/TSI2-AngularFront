/**
 * Created by alejandro on 11/10/15.
 */

angular.module('sapoApp')
    .service('cloudinaryService', ['$q',  'Producto', 'authService', 'REST_API', function ($q, Producto, authService, REST_API) {

        this.init = function () {};

        this.upload = function(data, idProd) {
            var deferred = $q.defer();
            data = data.slice(23);
            console.log(idProd);
            Producto.addImg({"id": idProd},
                {
                    imagen: data
                }, function (cuentas) {
                deferred.resolve(cuentas);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }]);
