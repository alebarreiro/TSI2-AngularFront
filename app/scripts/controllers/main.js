'use strict';
/**
 * @ngdoc function
 * @name sapoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapoApp
 */
angular.module('sapoApp')
  .controller('MainCtrl', [ '$scope', 'notifLimitesCuenta', 'notifStock',
    function($scope, notifLimitesCuenta, notifStock) {

      this.init = function () {
        $scope.notifLimitesCuenta = notifLimitesCuenta;
        console.log('notif stock');
        console.log(notifStock);
        var notificacionesStock = [];
        angular.forEach(notifStock, function(notificaciones){
          angular.forEach(notificaciones, function(notificacion){
            notificacionesStock.push(notificacion);
          });
        });
        $scope.notificaciones = notificacionesStock;
      };

      this.init();
  }]);
