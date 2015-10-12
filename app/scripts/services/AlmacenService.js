/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('almacenService', ['$q', 'Almacen', 'Usuario', 'authService', function ($q, Almacen, Usuario, authService) {

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

    this.crearNuevaAlmacen = function (almacen) {
      //Esta logica se va a ir cuando se haga lo del token
      var user = authService.getLoggedUser();
      console.log(user);


      var deferred = $q.defer();
      Usuario.agregarAlmacen({userid: user.id}, almacen, function (almacenResult) {
        console.log(almacenResult);
        deferred.resolve(almacenResult);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.validarAlmacen = function(almacen) {

      return almacen.nombre && almacen.nombre.length && almacen.url && almacen.url.length;
    }

  }]);