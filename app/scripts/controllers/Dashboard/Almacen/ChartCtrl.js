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
        onClick: function (points, evt) {
          console.log(points, evt);
        }
      };
    };

    

    this.init();

  }]);