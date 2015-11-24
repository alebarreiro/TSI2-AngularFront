/**
 * Created by alejandrobarreiro on 24/10/15.
 */
angular.module('sapoApp')
  .controller('ChatCtrl', [ '$scope', 'toastr', 'authService', '$stateParams',
    function ($scope, toastr, authService, $stateParams) {

      var loggedUser = authService.getLoggedUser();

      var host='http://nodejs4tsi2-backendrs.rhcloud.com:8000';
      var almacen = $stateParams.url ? $stateParams.url : 'default';
      var socket = io.connect(host+'/sapochat');

      socket.on('connect', function(){
        //conexión: paso el usuario y el nombre del almacen por parámetro
        //adduser es mi función server side.
        socket.emit('adduser', loggedUser.id, almacen);
      });

      //función para recibir mensajes
      socket.on('receivechat', function (username, data) {

          $scope.chatCtrl.messages.push({
            username: username,
            text: data,
            date: Date()
          });

        $scope.$apply();

      });

      this.init = function () {
        this.messages = [];
        $scope.messages = this.messages;
      };

      this.init();

      this.mandarMensaje = function () {

        var text = $scope.chatCtrl.writingMessage;
        $scope.chatCtrl.writingMessage = '';
        socket.emit('sendchat', text);
      }
    }]);