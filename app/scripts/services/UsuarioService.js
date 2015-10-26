/**
 * Created by alejandrobarreiro on 25/10/15.
 */
angular.module('sapoApp')
  .service('usuarioService', ['$q',  'Usuario',  function ($q, Usuario) {

    this.init = function () {};

    this.getMisAlmacenes = function () {
      var user = authService.getLoggedUser();

      var deferred = $q.defer();
      Usuario.getMisAlmacenes({userid: user.id}, {}, function (almacenes) {
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

    this.buscarUsuario = function (searchTerm) {

      var deferred = $q.defer();
      Usuario.buscarUsuario({userid: searchTerm}, function (usuariosResult) {
        console.log(usuariosResult);
        deferred.resolve(usuariosResult);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

  }]);