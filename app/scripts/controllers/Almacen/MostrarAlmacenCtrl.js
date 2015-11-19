angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacen', 'notificaciones', '$scope', 'almacenService', 'toastr', 'lodash', 'authService',
    function (almacen, notificaciones, $scope, almacenService, toastr, lodash, authService) {

    this.init = function () {

        //$css.bind({
        //  href: '../../../styles/sb-admin-2.css'
        //}, $scope);

        console.log(almacen.css);

       // $css.add()
      var styles = "";
      if (almacen.css && almacen.css.length) {
        styles = almacen.css;
      } else {
        styles = "body { " +
          "background-color: #f8f8f8 " +
          "} " +
          "#wrapper { " +
          "width: 100%; " +
          "} " +
          "#page-wrapper { " +
          "padding: 0 15px; " +
          "min-height: 568px; " +
          "background-color: #fff;" +
          "}" +
          ".h1 { " +
          "font-size: 36px; " +
          "} " +
          ".page-header {" +
          "padding-bottom: " +
          "9px;margin: 40px 0 20px;" +
          "border-bottom: 1px solid black;" +
          "}" +
          ".h2 { " +
          "font-size: 30px;" +
          " }";
      }

      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = almacen.css;
      document.body.appendChild(styles);

        console.log(almacen);
        $scope.almacenId = almacen.id;
        $scope.almacen = almacen;
        $scope.notificaciones = notificaciones;

        //SE OBTIENE LOS COMENTARIOS.
        //SE INICIALIZA ACÁ PORQUE NO SE COMO INVOCAR UNA FUNCIÓN DESDE THIS.INIT
        almacenService.obtenerComentarios($scope.almacenId)
            .then(function (result) {
                console.log(result);

              var actual = "",
                anterior = result[0].usuario,
                par = true,
                comentarios = [];
              angular.forEach(result, function(r){
                actual = r.usuario;
                if (actual == anterior) {
                  r.par = par;
                } else {
                  par = !par;
                  r.par = par;
                  anterior = actual;
                }
                comentarios.push(r);
              });
              console.log(comentarios);
                $scope.comentarios = comentarios;
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