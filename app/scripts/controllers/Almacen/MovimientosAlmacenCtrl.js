/**
 * Created by alejandro on 11/10/15.
 */

angular.module('sapoApp').controller('MovimientosAlmacenCtrl',
    ['almacen', '$scope', '$location', 'toastr', 'authService', 'carritoService', 'lodash', 'reportesService',
        function (almacen, $scope, $location, toastr, authService, carritoService, lodash, reportesService) {

            this.init = function () {
                $scope.almacen = almacen;
                $scope.movimientos = [];
                var mov = $scope.movimientos;
                reportesService.getReporteMovimientosStock($scope.almacen.id)
                    .then(function(reporte) {
                        console.log(reporte);

                        reporte.forEach(function (c) {
                            mov.push(c);
                        })

                        console.log($scope.movimientos);
                    })
                    .catch(function() {

                    });

            };

            this.init();


        }]);

