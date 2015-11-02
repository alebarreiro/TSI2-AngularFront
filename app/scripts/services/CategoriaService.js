/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .service('categoriaService', ['$q', 'Categoria', 'Producto', function ($q, Categoria, Producto) {

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


    this.createProducto = function(nombreProducto, descProducto, idCategoria) {
      var deferred = $q.defer();
      Producto.createProducto({}, {
        nombre: nombreProducto,
        descripcion: descProducto,
        categoria: idCategoria,
        isgenerico: false
      }, function (producto) {
        deferred.resolve(producto);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

  }]);