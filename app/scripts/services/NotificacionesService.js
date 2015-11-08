/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('notificacionesService', ['$q', 'Almacen', 'Usuario', 'authService', 'Notificacion', function ($q, Almacen, Usuario, authService, Notificacion) {

    this.init = function () {};

    this.getNotificacionesStock = function (idAlmacen) {
      var deferred = $q.defer();
      Notificacion.getNotificacionesStock({id: idAlmacen}, {},
        function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    this.getNotificacionesLimiteCuenta = function () {
      var user = authService.getLoggedUser();

      var deferred = $q.defer();
      Notificacion.getNotificacionesLimiteCuenta({userid: user.id}, {},
        function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };
  }]);