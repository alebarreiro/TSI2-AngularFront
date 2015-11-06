/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('ColaboradoresCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'usuarioService',
        function (almacen, $scope, almacenService, toastr, lodash, usuarioService) {

            this.init = function () {
                console.log(almacen);
                $scope.almacen = almacen;
                $scope.colaboradores = almacen.colaboradores;

            };

            this.init();

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

            this.seleccionarUsuario = function (userId) {
                $scope.usuarioSeleccionado = "Usuario seleccionado: " + userId;
                usuarioSeleccionado = userId;
            };

        }]);