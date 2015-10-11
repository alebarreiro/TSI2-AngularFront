/**
 * Created by alejandrobarreiro on 11/10/15.
 */
angular.module('sapoApp')
  .controller('EditarTemplateCtrl', ['template', '$scope', function (template, $scope) {


    this.init = function() {
      console.log(template);
      this.template = template;
      //$scope.template.nombre = template.nombre;
      //$scope.template.descripcion = template.descripcion;

    };

      this.init();
  }]);