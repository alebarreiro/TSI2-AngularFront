/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('WebScrapPaso2Ctrl', ['almacen', '$scope', 'webscrapService', 'toastr', 'lodash',
        function (almacen, $scope, webscrapService, toastr, lodash) {

            this.init = function () {
                $scope.mercadolibre = [];

                var ml = $scope.mercadolibre;
                webscrapService.getCategoriasML()
                    .then(function(a) {
                        a.forEach(function (c) {
                            ml.push(c);
                        });
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al contactar a Mercado Libre.');
                    });
            };

            this.init();

            this.buscarCategorias = function() {
                var ml = $scope.mercadolibre;
                webscrapService.getCategoriasML()
                    .then(function(a) {
                        toastr.success('Mercado Libre está activo');
                        a.forEach(function (c) {
                            ml.push(c);
                        });
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al contactar a Mercado Libre.');
                    });
            };

            this.seleccionarCategoria = function(idCategoria) {
                var catML = $scope.catMercadoLibre;
                webscrapService.searchCategoriasML(idCategoria)
                    .then(function(a) {
                        a.results.forEach(function (c) {
                            catML.push(c);
                        })
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al contactar a Mercado Libre.');
                    });
            }

        }]);