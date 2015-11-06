/**
 * Created by alejandro on 11/5/15.
 */

angular.module('sapoApp')
    .controller('WebScrapCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash',
        function (almacen, $scope, almacenService, toastr, lodash) {

    this.init = function () {
        console.log(almacen);
        $scope.almacen = almacen;
        $scope.mercadolibre = [];
        $scope.catMercadoLibre = [];

    };

    this.init();


    // *** FUNCIONES DE WEBSCRAPPING DE MERCADO LIBRE *** //

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
                toastr.success('Mercado Libre está activo');
                console.log(a);
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
                toastr.success('Mercado Libre está activo');
                console.log(a);
            })
            .catch(function () {
                toastr.error('Hubo un error al contactar a Mercado Libre.');
            });
    }

}]);