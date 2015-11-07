/**
 * Created by alejandrobarreiro on 7/11/15.
 */

angular.module('sapoApp')
  .controller('NotificacionesCtrl', ['$scope', 'almacenService', 'usuarioService', 'toastr', 'almacenes', 'AlmacenHandler',
    function ($scope, almacenService, usuarioService, toastr, almacenes, AlmacenHandler) {

      $scope.usuarios = {};
      var almacenSeleccionada;

      this.init = function () {
        $scope.almacenes = almacenes;
        $scope.productos = [];
      };


      $scope.seleccionarAlmacen = function (almacen) {
        console.log(almacen)
      };

      $scope.$watch('almacenId', function() {
       if ($scope.almacenId) {
         almacenSeleccionada = $scope.almacenId.replace(/ /g,'');
         var AlmacenHdlr= new AlmacenHandler();
         AlmacenHdlr.getAlmacen(almacenSeleccionada).then(function(almacen){
           $scope.productos = almacen.stockproductos;
         })
       }
      });

      $scope.activarNotificacion = function (producto, stockMinimo) {
        var data = {
          productoID: producto.productoID,
          minimo: stockMinimo,
          notifica: true
        };
        almacenService.activarNotificacionProducto(almacenSeleccionada, data)
          .then(function(a) {
            console.log(a);
            toastr.success('Notificacion activada.');
          })
          .catch(function () {
            toastr.error('Hubo un error al activar la notificacion.')
          });

      };



      this.init();
    }]);