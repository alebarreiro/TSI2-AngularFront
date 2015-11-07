/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .controller('ListarAlmacenesCtrl', ['almacenes', '$scope', '$state', 'almacenService', 'toastr',
    function (almacenes, $scope, $state, almacenService, toastr) {

    this.init = function() {
      $scope.almacenes = almacenes;
    };

    $scope.hacerPrivadaAlmacen = function (almacen) {

      var data = {
        nombre: almacen.nombre,
        id: almacen.id,
        descripcion: almacen.descripcion,
        privado: true,
      };

      almacenService.actualizarAlmacen(almacen.id, data)
        .then(function(){
          toastr.success("Almacen actualizada con exito!");
        })
        .catch(function(){
          toastr.warning("No es posible completar tu solicitud.");
        });
    };

    $scope.hacerPublicaAlmacen = function (almacen) {

      var data = {
        nombre: almacen.nombre,
        id: almacen.id,
        descripcion: almacen.descripcion,
        privado: false
      };

      almacenService.actualizarAlmacen(almacen.id, data)
        .then(function(){
          toastr.success("Almacen actualizada con exito!");
        })
        .catch(function(){
          toastr.warning("No es posible completar tu solicitud.");
        });
    };

      $scope.eliminarAlmacen = function (almacen) {

        if (confirm('Seguro que quiere eliminar el almacen seleccionado?')) {
          almacenService.borrarAlmacen(almacen.id)
            .then(function () {
              return almacenService.getMisAlmacenes()
            }).then(function (almacenes) {
              $scope.almacenes = almacenes;
              toastr.success("Almacen eliminada.");
            }.bind(this)).catch(function () {
              toastr.warning("No es posible completar tu solicitud.");
            });
        }
        ;
      };

    this.init();
  }]);