'use strict';
/**
 * @ngdoc function
 * @name sapoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapoApp
 */
angular.module('sapoApp')
  .controller('MainCtrl', [ '$scope', 'notifLimitesCuenta',
    function($scope, notifLimitesCuenta) {

      this.init = function () {
        $scope.notifLimitesCuenta = notifLimitesCuenta;

      };

      this.init();
  }]);
