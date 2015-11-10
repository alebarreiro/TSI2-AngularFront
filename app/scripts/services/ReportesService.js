/**
 * Created by alejandro on 11/10/15.
 */
angular.module('sapoApp')
    .service('reportesService', ['$q', 'Reporte', function ($q, Reporte) {

        this.init = function () {
        };

        this.getReporteMovimientosStock = function(idAlmacen) {
            var deferred = $q.defer();
            Reporte.getReporteMovimientosStock({ almacen: idAlmacen }, {}, function (reporte) {
                deferred.resolve(reporte);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


    }]);