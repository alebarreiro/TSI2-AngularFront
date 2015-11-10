'use strict';
/**
 * @ngdoc function
 * @name sapoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapoApp
 */
angular.module('sapoApp')
  .controller('MainCtrl', [ '$scope', 'authService',
    function($scope, authService) {

      this.init = function () {
        $scope.usuario = authService.getLoggedUser().id;
      };

      this.init();
  }]);
