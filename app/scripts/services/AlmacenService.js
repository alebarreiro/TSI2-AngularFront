/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('almacenService', ['$q', 'Almacen', function ($q, Almacen) {

    this.init = function () {};

    this.getAlmacen = function(id) {
      var deferred = $q.defer();
      Almacen.getAlmacen({ id: id }, {}, function (almacen) {
        deferred.resolve(almacen);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.getAlmacenes = function() {
      var deferred = $q.defer();
      Almacen.getAlmacenes({}, {}, function (almacenes) {
        console.log(almacenes);
        deferred.resolve(almacenes);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

  }]);