/**
 * Created by alejandrobarreiro on 7/11/15.
 */

angular.module('sapoApp')
  .controller('NotificacionesCtrl', ['$scope', 'notificacionesService', 'usuarioService', 'toastr', 'almacenes', 'AlmacenHandler',
    function ($scope, notificacionesService, usuarioService, toastr, almacenes, AlmacenHandler) {

      $scope.usuarios = {};
      var almacenSeleccionada;

      this.init = function () {
        $scope.almacenes = almacenes;
        $scope.productos = [];
      };

      $scope.$watch('almacenId', function() {
       if ($scope.almacenId) {
         almacenSeleccionada = $scope.almacenId.replace(/ /g,'');
         var AlmacenHdlr= new AlmacenHandler();
         AlmacenHdlr.getAlmacen(almacenSeleccionada).then(function(almacen){
           var productosConNotif = almacen.stockproductos;;

           notificacionesService.getNotificacionesUser(almacenSeleccionada).then(function (notificaciones) {
             console.log(notificaciones);

              angular.forEach(notificaciones, function(notif){
                angular.forEach(productosConNotif, function(prod){
                  if (prod.productoID == notif.productoID) {
                    prod.notifica = true;
                    prod.minimo = notif.minimo;
                  }
                })
              });
              console.log(productosConNotif);
              $scope.productos = productosConNotif;
           });
         })
       }
      });

      $scope.activarNotificacion = function (producto, stockMinimo) {
        var data = {
          productoID: producto.productoID,
          minimo: stockMinimo,
          notifica: true
        };
        notificacionesService.activarNotificacionProducto(almacenSeleccionada, data)
          .then(function(a) {
            console.log(a);
            toastr.success('Notificacion activada.');
          })
          .catch(function () {
            toastr.error('Hubo un error al activar la notificacion.')
          });
      };

      $scope.desactivarNotificacion = function (producto, stockMinimo) {

        var data = {
          productoID: producto.productoID,
        };
        notificacionesService.eliminarNotificacion(almacenSeleccionada, data)
          .then(function(a) {
            console.log(a);
            toastr.success('Notificacion desactivada.');
          })
          .catch(function () {
            toastr.error('Hubo un error al activar la notificacion.')
          });

      };



      this.init();
    }]);