/**
 * Created by alejandrobarreiro on 6/11/15.
 */
angular.module('sapoApp').controller('CarritoCtrl',
  ['$scope', '$location', 'toastr', 'authService',
    function ($scope, $location, toastr, authService) {

      $scope.test = " hola mundo "

      console.log("holaaa");
    }]);