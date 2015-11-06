/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('ColaboradoresCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash',
        function (almacen, $scope, almacenService, toastr, lodash) {

            this.init = function () {
                console.log(almacen);
                $scope.almacen = almacen;
                $scope.mercadolibre = [];
                $scope.catMercadoLibre = [];

            };

            this.init();

// *** FUNCIONES DE COLABORADORES *** //

            this.agregarColaborador = function () {
                if (!usuarioSeleccionado)
                    toastr.warning("Por favor, seleccione un usuario");
                else {
                    almacenService.agregarColaborador($scope.almacenId, usuarioSeleccionado)
                        .then(function (result) {
                            console.log(result);
                            toastr.success('Colaborador agregado!');
                        })
                        .catch(function () {
                            toastr.error('Hubo un error al dar de alta el colaborador.')
                        })
                }
            };

            $scope.$watch('searchterm', function() {
                var searchTerm = $scope.searchterm;
                if (searchTerm && searchTerm.length) {
                    usuarioService.buscarUsuario(searchTerm)
                        .then(function (searchResult) {
                            $scope.usuarios = searchResult;
                        })
                        .catch(function () {
                            toastr.error('Hubo un error al realizar la busqueda.')
                        })
                }
            });

            $scope.seleccionarUsuario = function (userId) {
                $scope.usuarioSeleccionado = "Usuario seleccionado: " + userId;
                usuarioSeleccionado = userId;
            };

        }]);