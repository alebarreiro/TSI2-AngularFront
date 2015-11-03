/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .controller('ListarAlmacenesCtrl', ['almacenes', '$scope', '$state', 'almacenService', 'toastr',
    function (almacenes, $scope, $state, almacenService, toastr) {

    this.init = function() {
      $scope.almacenes = almacenes;
    };

    $scope.hacerPrivadaAlmacen = function (almacenId) {

      var data = {
        privado: true
      };

      almacenService.actualizarAlmacen(almacenId, data)
        .then(function(){
          toastr.success("Almacen actualizada con exito!");
        })
        .catch(function(){
          toastr.warning("No es posible completar tu solicitud.");
        });
    };

    $scope.hacerPublicaAlmacen = function (almacenId) {

      var data = {
        privado: false
      };

      almacenService.actualizarAlmacen(almacenId, data)
        .then(function(){
          toastr.success("Almacen actualizada con exito!");
        })
        .catch(function(){
          toastr.warning("No es posible completar tu solicitud.");
        });
    };

      $scope.entrarAlmacen = function(idAlmacen) {
        //IMPLEMENTAR LA LÓGICA
      };

    this.init();
  }]);