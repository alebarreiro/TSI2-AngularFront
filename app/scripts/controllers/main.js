'use strict';
/**
 * @ngdoc function
 * @name sapoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapoApp
 */
angular.module('sapoApp')
  .controller('MainCtrl', [ '$scope', 'notifLimitesCuenta', 'notifStock', 'reporteDashboard',
    function($scope, notifLimitesCuenta, notifStock, reporteDashboard) {

      this.init = function () {
        $scope.notifLimitesCuenta = notifLimitesCuenta;
        console.log('rep dash');
        console.log(reporteDashboard);
        var notificacionesStock = [];
        angular.forEach(notifStock, function(notificaciones){
          angular.forEach(notificaciones, function(notificacion){
            notificacionesStock.push(notificacion);
          });
        });
        $scope.notificaciones = notificacionesStock;
        $scope.dashboard = reporteDashboard;
      };

      this.init();
  }]);
