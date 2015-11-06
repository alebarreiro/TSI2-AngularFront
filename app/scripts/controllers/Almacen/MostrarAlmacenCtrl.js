angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr', 'lodash', 'ProductoHandler', 'CategoriaHandler', 'categoriaService', 'webscrapService', 'usuarioService', 'authService',
    function (almacen, $scope, almacenService, toastr, lodash, ProductoHandler, CategoriaHandler, categoriaService, webscrapService, usuarioService, authService) {

    this.init = function () {
        console.log(almacen);
        $scope.almacenId = almacen.id;
        $scope.almacen = almacen;
        $scope.productos = almacen.stockproductos;
        $scope.categorias = almacen.categorias;
        $scope.colaboradores = almacen.colaboradores;
        $scope.mercadolibre = [];
        $scope.catMercadoLibre = [];
        $scope.usuarioSeleccionado = "";
        $scope.searchterm = "";

        //SE OBTIENE LOS COMENTARIOS.
        //SE INICIALIZA ACÁ PORQUE NO SE COMO INVOCAR UNA FUNCIÓN DESDE THIS.INIT
        almacenService.obtenerComentarios($scope.almacenId)
            .then(function (result) {
                console.log(result);
                $scope.comentarios = result;
            })
            .catch(function () {
                toastr.error('Hubo un error al dar de alta el colaborador.')
            })
    };

    this.init();

    $scope.obtenerComentarios = function() {
        almacenService.obtenerComentarios($scope.almacenId)
            .then(function (result) {
                console.log(result);
                toastr.success('Colaborador agregado!');
            })
            .catch(function () {
                toastr.error('Hubo un error al dar de alta el colaborador.')
            })
    }

    this.crearComentario = function(comentario) {
        if (!comentario) {
            toastr.error('Ingrese un comentario.');
        } else if (comentario.length > 500) {
            toastr.error('El comentario no puede superar los 500 caracteres.');
        } else {
            almacenService.agregarComentario($scope.almacenId, authService.getLoggedUser().id, comentario)
                .then(function (result) {
                    console.log(result);
                    $scope.comentarios.push(result);
                    toastr.success('¡Comentario agregado!');
                    $scope.comentario.comentario = "";
                })
                .catch(function () {
                    toastr.error('Hubo un error al dar de alta el comentario.')
                })
        }
    }

  }]);