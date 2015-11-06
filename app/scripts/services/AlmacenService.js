/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .service('almacenService', ['$q', 'Almacen', 'Usuario', 'authService', 'Categoria', function ($q, Almacen, Usuario, authService, Categoria) {

    this.init = function () {};

    this.getAlmacen = function(id) {
      var deferred = $q.defer();
      console.log('Buscando almacén con ID ' + id);
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

    this.cargarCategoriasAlmacen = function (almacenId, categorias) {

      var deferred = $q.defer();
      Almacen.agregarCategorias({id: almacenId}, categorias, function (almacenResult) {
        console.log(almacenResult);
        deferred.resolve(almacenResult);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    //Crea la categoria especifica
    this.crearCategoriaAlmacen = function (nombreCategoria, descCategoria) {

        var deferred = $q.defer();
        Categoria.createCategoria({}, {
            nombre: nombreCategoria,
            descripcion: descCategoria,
            isgenerico: false
        }, function (categoria) {
            deferred.resolve(categoria);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };


    this.cargarProductosAlmacen = function (almacenId, productos) {

      var deferred = $q.defer();
      Almacen.agregarProductos({id: almacenId}, productos, function (almacenResult) {
        console.log(almacenResult);
        deferred.resolve(almacenResult);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.agregarColaborador = function (almacenId, userId) {

      var deferred = $q.defer();
      Almacen.agregarColaborador({id: almacenId, userid: userId}, function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.actualizarAlmacen = function (almacenId, data) {

      var deferred = $q.defer();
      Almacen.actualizarAlmacen({id: almacenId}, data, function (result) {
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.validarAlmacen = function(almacen) {

      return almacen.nombre && almacen.nombre.length && almacen.id && almacen.id.length;
    };

    this.actualizarStockAlmacen = function (almacenId, productoId, stock) {
        var deferred = $q.defer();
        Almacen.actualizarStockAlmacen({id: almacenId, prodid: productoId, cant: stock},
            {},
            function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
        });
        return deferred.promise;
    }

    this.obtenerComentarios = function (idAlmacen) {
        var deferred = $q.defer();
        Almacen.getComentarios({id: idAlmacen},
            {},
            function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    this.agregarComentario = function(idAlmacen, usuario, comentario) {
        var deferred = $q.defer();
        Almacen.agregarComentario({id: idAlmacen},
            {
                usuario: usuario,
                comentario: comentario.comentario
            },
            function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }
  }]);