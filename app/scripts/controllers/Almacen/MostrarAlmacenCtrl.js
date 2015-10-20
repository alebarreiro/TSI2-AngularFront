angular.module('sapoApp')
  .controller('MostrarAlmacenCtrl', ['almacenId', '$scope', 'almacenService', 'toastr',
    function (almacenId, $scope, almacenService, toastr) {

    this.init = function () {
      console.log(almacenId);
      $scope.almacenId = almacenId;
    };

    this.init();
  }]);