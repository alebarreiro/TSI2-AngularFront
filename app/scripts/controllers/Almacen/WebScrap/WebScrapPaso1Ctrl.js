/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('WebScrapPaso1Ctrl', ['almacen', '$scope', 'webscrapService', 'toastr', 'lodash',
        function (almacen, $scope, webscrapService, toastr, lodash) {

            this.init = function () {
                console.log(almacen);
                $scope.almacen = almacen;
                $scope.mercadolibre = [];
                $scope.categorias = almacen.categorias;
            };

            this.init();

            this.poblarCategoria = function(idCategoria) {
                $scope.idCategoria = idCategoria;
            }

        }]);