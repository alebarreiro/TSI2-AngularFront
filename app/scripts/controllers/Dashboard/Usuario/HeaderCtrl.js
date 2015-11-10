/**
 * Created by alejandrobarreiro on 26/10/15.
 */
angular.module('sapoApp')
  .controller('HeaderCtrl', ['$rootScope', 'AUTH_EVENTS', 'notificacionesService', '$scope', 'usuarioService', 'cuentaService', 'authService',
    function($rootScope, AUTH_EVENTS, notificacionesService, $scope, usuarioService, cuentaService, authService) {

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

      cuentaService.getCuentaUsuario()
        .then(function(res){
          console.log('cuenta del usuario');
          console.log(res);
          var user = authService.getLoggedUser();
          user.cuenta = res;
          authService.setLoggedInUser(user);
        })
        .catch(function(){
          var user = authService.getLoggedUser();
          user.cuenta = {};
          authService.setLoggedInUser(user);
        })


    };

    this.onClickLogout = function() {

      $rootScope.$emit(AUTH_EVENTS.signout);
    };

    this.init();
  }]);
