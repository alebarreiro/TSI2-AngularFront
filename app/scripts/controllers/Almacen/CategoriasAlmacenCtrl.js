/**
 * Created by alejandro on 11/6/15.
 */

angular.module('sapoApp')
    .controller('CategoriasAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'usuarioService',
        function (almacen, $scope, almacenService, toastr, lodash, usuarioService) {

            this.init = function () {
                console.log(almacen);
                $scope.almacen = almacen;
                $scope.categorias = almacen.categorias;

            };

            this.init();

            //Crea una categoria específica.
            this.crearCategoria = function (nombreCategoria, descCategoria) {
                if (!nombreCategoria) {
                    toastr.error('Ingrese un nombre para la categoría.');
                } else if (nombreCategoria.length > 63) {
                    toastr.error('El nombre de la cateogría no puede superar los 64 caracteres.');
                } else if (descCategoria.length > 5000) {
                    toastr.error('La descripción de la categoría no puede superar los 5000 caracteres.');
                } else {
                    var cat = $scope.categorias;
                    var that = this;
                    var id = $scope.almacen.id;

                    //Invoca al service para hacer el POST de la categoria.
                    this.categoria = almacenService.crearCategoriaAlmacen(nombreCategoria, descCategoria)
                        .then(function (a) {
                            console.log(a);
                            cat.push(a);
                            that.cargarCategoria(id, [a.id]);
                        })
                        .catch(function () {
                            toastr.error('Hubo un error al dar de alta las categorias.');
                        });
                }
            };

            //Carga la categoria en el almacén.
            this.cargarCategoria = function(idAlmacen, categoria) {
                almacenService.cargarCategoriasAlmacen(idAlmacen, categoria)
                    .then(function(a) {
                        console.log(a);
                        toastr.success('Categorias del almacen confirmadas');
                    })
                    .catch(function () {
                        toastr.error('Hubo un error al dar de alta las categorias.');
                    });
            }

        }]);