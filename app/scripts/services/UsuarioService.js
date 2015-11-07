/**
 * Created by alejandrobarreiro on 25/10/15.
 */
angular.module('sapoApp')
  .service('usuarioService', ['$q',  'Usuario', 'Reporte', 'authService', function ($q, Usuario, Reporte, authService) {

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
    };

    this.obtenerReporteValorizacion = function () {

      var user = authService.getLoggedUser();
      var deferred = $q.defer();
      Reporte.getReporteValorizacion({userid: user.id}, function (reporte) {
        console.log(reporte);
        deferred.resolve(reporte);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.obtenerReporteMovimientos = function () {
      var deferred = $q.defer();
      Reporte.getReporteMovimientos({userid: user.id}, function (reporte) {
        console.log(reporte);
        deferred.resolve(reporte);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    this.parseReporte = function (reporte) {
        var indices = [],
          indicesRandom = [],
          encontrados = 0,
          series = [],
          data = [];

        for (var index = 0; index < reporte.data.length; index++) {
          var datos = reporte.data[index];
          if ( (datos[0] > 0 || datos[1]>0 || datos[2]>0) && encontrados < 4) {
            indices.push(index);
            encontrados++;
          } else {
            indicesRandom.push(index);
          }
        }
        var indexRandom = 0;
        while (encontrados < 4 && indexRandom < indicesRandom.length) {
          indices.push(indicesRandom[indexRandom]);
          indexRandom++;
          encontrados++;
        }

        for (var indice in indices) {
          series.push(reporte.series[indices[indice]]);
          data.push(reporte.data[indices[indice]]);
        }

        return {
          series: series,
          labels: reporte.labels,
          data: data
        }
    }

  }]);