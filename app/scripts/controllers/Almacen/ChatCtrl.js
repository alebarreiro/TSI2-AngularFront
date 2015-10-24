/**
 * Created by alejandrobarreiro on 24/10/15.
 */
angular.module('sapoApp')
  .controller('ChatCtrl', [ '$scope', 'toastr',
    function ($scope, toastr) {

      wsUrl = 'ws:sapo-backendrs.rhcloud.com:8000/openshiftproject/chat/Ale';

      console.log('WebSockets Url : ' + wsUrl);
      ws = new WebSocket(wsUrl);

      ws.onopen = function(event){
        console.log('WebSocket connection started');
      };

      ws.onclose = function(event){
        console.log("Remote host closed or refused WebSocket connection");
        console.log(event);
      };

      ws.onmessage = function(event){
        console.log(event.data);
        $scope.chatCtrl.messages.push({
          username: 'Remote',
          text: event.data,
          date: Date()
        });
        $scope.$apply();
      };


      this.init = function () {
        this.messages = [];
        $scope.messages = this.messages;
      };

      this.init();

      this.mandarMensaje = function () {
        console.log("quiere mandar mensaje");
        console.log($scope);
        var text = $scope.chatCtrl.writingMessage,
          msg = {
          username: 'Yo',
          text: text,
          date: Date()
        };
        $scope.chatCtrl.writingMessage = '';
        $scope.chatCtrl.messages.push(msg);
        ws.send(text);
      }
    }]);