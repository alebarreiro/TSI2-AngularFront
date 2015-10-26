/**
 * Created by alejandrobarreiro on 23/10/15.
 */
'use strict';
angular.module('sapoApp')
  .factory('CategoriaHandler', [function () {

    var CategoriaHandler = function () {
      this.init();
    };

    CategoriaHandler.prototype.categorias = {};

    CategoriaHandler.prototype.init = function () {};

    CategoriaHandler.prototype.setCategorias = function (categorias) {
      CategoriaHandler.prototype.categorias = categorias;
    };

    CategoriaHandler.prototype.getCategorias = function () {
      return CategoriaHandler.prototype.categorias;
    };

    CategoriaHandler.prototype.getCategoria = function(id) {
      var categoria,
        categorias = CategoriaHandler.prototype.getCategorias();

      if (categorias) {
        categorias.forEach(function (c) {
          if (c && c.id == id) {
            categoria = c;
            return;
          }
        });
        return categoria;
      } else {
        return undefined;
      }
    };

    return CategoriaHandler;
  }]);