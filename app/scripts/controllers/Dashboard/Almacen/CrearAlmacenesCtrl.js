/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .controller('CrearAlmacenesCtrl', ['$scope', 'almacenService', 'toastr', function ($scope, almacenService, toastr) {

    $scope.almacen = {};
    $scope.noTemplateSelected = true;

    this.init = function () {

    };

    $scope.seleccionarTemplate = function (idTemplate) {
      console.log("Seleccionaste: " + idTemplate);
      $scope.almacen.templateElegido = idTemplate;
    };

    $scope.crearAlmacen = function () {

      var almacen = $scope.almacen;

      if (almacenService.validarAlmacen(almacen)) {
        almacenService.crearNuevaAlmacen(almacen)
          .then(function (a) {
            console.log(a);
            $scope.almacen.id = a.id;
            toastr.success('Datos del almacen confirmados');
          })
          .catch(function () {
            toastr.error('Hubo un error al crear el almacen.')
          });
      } else {
        toastr.warning('Por favor, ingrese los datos del almacen.');
      }
    },

      this.init();
  }]);