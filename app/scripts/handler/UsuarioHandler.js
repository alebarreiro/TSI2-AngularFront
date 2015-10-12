/**
 * Created by alejandrobarreiro on 12/10/15.
 */
'use strict';
angular.module('sapoApp')
  .factory('UsuarioHandler', [function () {

    var UsuarioHandler = function () {
      this.init();
    };

    UsuarioHandler.prototype.currentUser = {};

    UsuarioHandler.prototype.init = function () {};

    UsuarioHandler.prototype.setCurrentUser = function (user) {
      UsuarioHandler.prototype.currentUser = user;
    };

    UsuarioHandler.prototype.getCurrentUser = function () {
      return UsuarioHandler.prototype.currentUser;
    };

    UsuarioHandler.prototype.setToken = function (token) {
      UsuarioHandler.prototype.currentUser.token = token;
    };

    UsuarioHandler.prototype.hasToken = function () {
      return UsuarioHandler.prototype.currentUser.token ? true : false;
    };

    UsuarioHandler.prototype.getToken = function () {
      return UsuarioHandler.prototype.currentUser.token;
    };

    UsuarioHandler.prototype.getUserId = function () {
      return UsuarioHandler.prototype.currentUser.id;
    };



    return UsuarioHandler;
  }]);
