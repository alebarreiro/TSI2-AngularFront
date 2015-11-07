/**
 * Created by alejandrobarreiro on 6/11/15.
 */
angular.module('sapoApp')
  .controller('ChartCtrl', ['$scope', 'usuarioService', 'reporteVal', function ($scope, usuarioService, reporteVal) {

    var reporte;
    var that = this;

    this.init = function () {

      var mejoresReporteVal = usuarioService.parseReporte(reporteVal);
      console.log(mejoresReporteVal)


      $scope.bar = {
        labels: mejoresReporteVal.labels,
        series: mejoresReporteVal.series,
        data: mejoresReporteVal.data,
      };

      $scope.line = {
        labels: ['Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        series: ['Almacen 1', 'Almacen 2', 'Almacen 3'],
        data: [
          [65, 59, 80, 81],
          [28, 48, 40, 19],
          [40, 20, 30, 45],
        ],
      };
    };



    this.init();

  }]);