/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .service('categoriaService', ['$q', 'Categoria', function ($q, Categoria) {

    this.init = function () {
    };

    this.getCategoria = function(id) {
      var deferred = $q.defer();
      Categoria.getCategoria({ id: id }, {}, function (categoria) {
        deferred.resolve(categoria);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.getCategorias = function() {
      var deferred = $q.defer();
      Categoria.getCategorias({}, {}, function (categorias) {
        deferred.resolve(categorias);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.getProductosCategoria = function(id) {
      var deferred = $q.defer();
      Categoria.getProductosCategoria({id: id}, {}, function (productos) {

        deferred.resolve(productos);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

  }]);