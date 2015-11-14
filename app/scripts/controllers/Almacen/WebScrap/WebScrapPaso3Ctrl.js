

angular.module('sapoApp')
    .controller('WebScrapPaso3Ctrl', ['almacen', '$scope', 'webscrapService', 'toastr', 'lodash', 'WebScrapHandler',
        function (almacen, $scope, webscrapService, toastr, lodash, WebScrapHandler) {

            this.init = function () {
                this.WebScrapHandler = new WebScrapHandler();
                console.log();
            };

            this.init();

            this.importarProducto = function(idProducto) {
                webscrapService.addProductosML(idProducto, this.WebScrapHandler.getCategoria())
                    .then(function(a) {
                        console.log(a);
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al contactar a Mercado Libre.');
                    });
            }

        }]);
