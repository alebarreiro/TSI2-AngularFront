/**
 * Created by alejandrobarreiro on 6/11/15.
 */
angular.module('sapoApp')
  .controller('ChartCtrl', ['$scope', 'usuarioService', 'reporteVal', function ($scope, usuarioService, reporteVal) {

    var reporte;
    var that = this;

    this.init = function () {

      var mejoresReporteVal = this.parseReporte(reporteVal);
      console.log(mejoresReporteVal)


      $scope.bar = {
        labels: mejoresReporteVal.labels,
        series: mejoresReporteVal.series,
        data: mejoresReporteVal.data,
        onClick: function (points, evt) {
          console.log(points, evt);
        }
      };
    };

    this.parseReporte = function (reporte) {
      var indices = [],
        indicesRandom = [],
        encontrados = 0,
        series = [],
        data = [];

      for (var index = 0; index < reporte.data.length; index++) {
        var datos = reporte.data[index];
        if ((datos[0] > 0 || datos[1] > 0 || datos[2] > 0) && encontrados < 4) {
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
    };

    this.init();

  }]);