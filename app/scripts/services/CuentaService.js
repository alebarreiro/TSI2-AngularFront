/**
 * Created by alejandrobarreiro on 27/10/15.
 */
angular.module('sapoApp')
  .service('cuentaService', ['$q',  'Cuenta', 'authService', function ($q, Cuenta, authService) {

    this.init = function () {};

    this.getCuentas = function () {

      var deferred = $q.defer();
      Cuenta.getCuentas({}, {}, function (cuentas) {
        deferred.resolve(cuentas);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.crearCuenta = function (data) {

      var deferred = $q.defer();
      Cuenta.crearCuenta({}, data, function (cuenta) {
        deferred.resolve(cuenta);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.actualizarCuenta = function (data) {

      var deferred = $q.defer();

      Cuenta.actualizarCuenta({id: data.id}, data, function (cuenta) {
        deferred.resolve(cuenta);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    /**
     * Cambio de plan (cuenta) al usuario.
     * @param idCuenta id de la cuenta del nuevo plan.
     * @returns {*}
     */
    this.actualizarCuentaUsuario = function (idCuenta) {

      var deferred = $q.defer(),
        user = authService.getLoggedUser();
      Cuenta.actualizarCuentaUsuario({userid: user.id, id: idCuenta}, {}, function (cuenta) {
        deferred.resolve(cuenta);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };


    this.getCuentaUsuario = function () {

      var deferred = $q.defer(),
        user = authService.getLoggedUser();
      Cuenta.getCuentaUsuario({userid: user.id}, {}, function (cuenta) {
        deferred.resolve(cuenta);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

  }]);