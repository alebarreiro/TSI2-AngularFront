angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacen', '$scope', 'almacenService', 'toastr',
    function (almacen, $scope, almacenService, toastr) {

    this.init = function () {
      console.log(almacen);
      $scope.almacenId = almacen.id;
      $scope.almacen = almacen;
    };

    this.init();
  }]);