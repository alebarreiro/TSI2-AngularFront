/**
 * Created by alejandrobarreiro on 8/10/15.
 */
angular.module('sapoApp')
  .controller('ListarAlmacenesCtrl', ['almacenes',  function (almacenes) {

    this.init = function() {
      this.almacenes = almacenes;
    };

    this.init();
  }]);