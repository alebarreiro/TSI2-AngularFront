/**
 * Created by alejandro on 11/10/15.
 */

angular.module('sapoApp').controller('CarritoAgregarCtrl',
    ['$scope', '$location', 'toastr', 'authService',
        function ($scope, $location, toastr, authService) {

            this.init = function () {
                $scope.almacen = almacen;
                $scope.categorias = almacen.categorias;
                $scope.productos = [];
            };

            this.init();

        }]);
