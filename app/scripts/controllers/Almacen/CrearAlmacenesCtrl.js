/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .controller('CrearAlmacenesCtrl', [ '$scope', function ($scope) {

    $scope.almacen = {};
    $scope.noTemplateSelected = true;

    this.init = function() {

    };

    $scope.crearAlmacen = function() {

      console.log($scope.almacen.nombre);
    };

    $scope.seleccionarTemplate = function(idTemplate) {
      console.log("Seleccionaste: " + idTemplate);
      $scope.$parent.almacen.templateElegido = idTemplate;
    };

    $scope.crearTienda = function() {
      console.log($scope.almacen);
    },

    this.init();
  }]);