/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('WebScrapPaso1Ctrl', ['almacen', '$scope', 'webscrapService', 'toastr', 'lodash', 'WebScrapHandler',
        function (almacen, $scope, webscrapService, toastr, lodash, WebScrapHandler) {

            this.init = function () {
                console.log(almacen);
                $scope.almacen = almacen;
                $scope.mercadolibre = [];
                $scope.categorias = almacen.categorias;

                this.WebScrapHandler = new WebScrapHandler();
            };

            this.init();

            this.poblarCategoria = function(idCategoria) {
                $scope.idCategoria = idCategoria;
                this.WebScrapHandler.setCategoria(idCategoria);
                console.log(this.WebScrapHandler.getCategoria());
            }

        }]);