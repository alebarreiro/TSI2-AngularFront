

angular.module('sapoApp')
    .controller('WebScrapPaso3Ctrl', ['almacen', '$scope', 'webscrapService', 'toastr', 'lodash', 'AlmacenHandler', 'CategoriaHandler',
        function (almacen, $scope, webscrapService, toastr, lodash, AlmacenHandler, CategoriaHandler) {

            this.init = function () {
            };

            this.init();

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

            this.importarProducto = function(idProducto) {
                webscrapService.addProductosML(idProducto)
                    .then(function(a) {
                        console.log(a);
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al contactar a Mercado Libre.');
                    });
            }

        }]);
