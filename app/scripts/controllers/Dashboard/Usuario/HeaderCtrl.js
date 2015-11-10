/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('HeaderCtrl', ['$rootScope', 'authService', 'AUTH_EVENTS', 'notificacionesService', '$scope', 'usuarioService',
    function($rootScope, authService, AUTH_EVENTS, notificacionesService, $scope, usuarioService) {

    this.init = function() {

      notificacionesService.getAllNotificacionesStock().then(function (notifStock) {
        console.log('header');

        var notificacionesStock = [];
        angular.forEach(notifStock, function(notificaciones){
          angular.forEach(notificaciones, function(notificacion){
            notificacionesStock.push(notificacion);
          });
        });

        $scope.notificacionesStock = notificacionesStock;
      });

      notificacionesService.getNotificacionesLimiteCuenta().then(function (notificaciones) {
        $scope.notifLimitesCuenta = notificaciones;
      });


     usuarioService.obtenerReporteDashboard().then(function (reporte) {
       $scope.dashboard = reporte;
     });

    };

    this.onClickLogout = function() {
      //Por ahora no lo hacemos en facebook porque estamos en localhost..
      //authService.doFacebookLogout(function(response){
      //})
      $rootScope.$emit(AUTH_EVENTS.signout);
    };

    this.init();
  }]);
