/**
 * Created by alejandrobarreiro on 26/10/15.
 */
/**
 * Created by alejandrobarreiro on 12/10/15.
 */
'use strict';
angular.module('sapoApp')
  .factory('AlmacenHandler', ['almacenService', '$q', function (almacenService, $q) {

    var AlmacenHandler = function () {
      this.init();
    };

    AlmacenHandler.prototype.Almacenes = [];

    AlmacenHandler.prototype.init = function() {};

    AlmacenHandler.prototype.getAlmacenes = function () {
      //Aca tenemos un "invento" para cachear las promesas
      return $q(function(resolve, reject) {
        var promiseCache = AlmacenHandler.prototype.Almacenes;
        if (promiseCache.length) {
          resolve(promiseCache);
        } else {
          resolve(almacenService.getMisAlmacenes().then(function(almacenes){
            AlmacenHandler.prototype.Almacenes = almacenes;
            return almacenes;
          }));
        }
      });
    };

    return AlmacenHandler;
  }]);
