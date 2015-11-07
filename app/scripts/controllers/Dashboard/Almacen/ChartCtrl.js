/**
 * Created by alejandrobarreiro on 6/11/15.
 */
angular.module('sapoApp')
  .controller('ChartCtrl', ['$scope', 'usuarioService', 'reporteVal', 'reporteMov', function ($scope, usuarioService, reporteVal, reporteMov) {

    var reporte;
    var that = this;

    this.init = function () {

      var mejoresReporteVal = usuarioService.parseReporte(reporteVal),
        fixReporteMov = {
          labels: reporteMov.series,
          series: reporteMov.labels,
          data: reporteMov.data
        },
        mejoresReporteMov = usuarioService.parseReporte(fixReporteMov);

      $scope.bar = {
        labels: mejoresReporteVal.labels,
        series: mejoresReporteVal.series,
        data: mejoresReporteVal.data,
      };

      $scope.line = {
        labels: mejoresReporteMov.labels,
        series: mejoresReporteMov.series,
        data: mejoresReporteMov.data
      };

      var visitas = [],
        stocks = [];

      for (var i = 0; i<mejoresReporteVal.data.length; i++) {
        visitas.push(mejoresReporteVal.data[i][0]);
        stocks.push(mejoresReporteVal.data[i][2])
      }

      $scope.pie = {
        labels : mejoresReporteVal.series,
        data : visitas
      };

      $scope.pie2 = {
        labels : mejoresReporteVal.series,
        data : stocks
      };
    };



    this.init();

  }]);