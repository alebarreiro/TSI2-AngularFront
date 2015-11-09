/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('notificacionesService', ['$q', 'Almacen', 'Usuario', 'authService', 'Notificacion', 'AlmacenHandler',
    function ($q, Almacen, Usuario, authService, Notificacion, AlmacenHandler) {

    this.init = function () {};

    this.getNotificacionesStock = function (idAlmacen) {
      var user = authService.getLoggedUser();

      var deferred = $q.defer();
      Notificacion.getNotificacionesStock({id: idAlmacen, userid: user.id}, {},
        function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    };

    this.getAllNotificacionesStock = function () {
      var user = authService.getLoggedUser();

      var almacenHandler = new AlmacenHandler();
      return almacenHandler.getAlmacenes().then(function (listaAlmacenes) {
        var promises = [];
        angular.forEach(listaAlmacenes, function(almacen){
          promises.push(Notificacion.getNotificacionesStock({id: almacen.id, userid: user.id}).$promise);
        });

        //Super join de promises
        return $q.all(promises);
      });
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

    this.activarNotificacionProducto = function (idAlmacen, data) {
      var deferred = $q.defer();
      var user = authService.getLoggedUser();

      Almacen.activarNotificacion({id: idAlmacen, userid: user.id}, data, function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.getNotificacionesUser = function (idAlmacen) {
      var deferred = $q.defer();
      var user = authService.getLoggedUser();

      Almacen.getNotificacionesUser({id: idAlmacen, userid: user.id}, function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.eliminarNotificacion = function (idAlmacen, data) {
      var deferred = $q.defer();
      var user = authService.getLoggedUser();

      console.log(data);
      Almacen.eliminarNotificacion({id: idAlmacen, userid: user.id}, data, function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
  }]);