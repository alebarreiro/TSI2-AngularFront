/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .controller('ListarTemplatesCtrl', [ '$scope', function ($scope) {

    this.init = function() {
      this.templates = [
        {
          id: 1,
          nombre: 'Barra loca',
          descripcion: 'Crea tu almacen con todos tus tragos'
        },
        {
          id: 2,
          nombre: 'Heladera',
          descripcion: 'Crea tu almacen con todos tus articulos de heladera'
        },
        {
          id: 3,
          nombre: 'Garage',
          descripcion: 'Almacen con todos los articulos de tu garage'
        }
      ];

    };

    //$scope.seleccionarTemplate = function(idTemplate) {
    //  console.log("Seleccionaste: " + idTemplate);
    //};

    this.init();
  }]);