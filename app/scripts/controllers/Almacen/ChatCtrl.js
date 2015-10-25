/**
 * Created by alejandrobarreiro on 24/10/15.
 */
angular.module('sapoApp')
  .controller('ChatCtrl', [ '$scope', 'toastr', 'authService',
    function ($scope, toastr, authService) {

      var loggedUser = authService.getLoggedUser();
      console.log(loggedUser);

      wsUrl = 'ws:sapo-backendrs.rhcloud.com:8000/openshiftproject/chat/' + loggedUser.id;

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

        if (event.data) {
          var parseMsg = parseChatMessage(event.data);

            $scope.chatCtrl.messages.push({
              username: parseMsg.nick,
              text: parseMsg.text,
              date: Date()
            });

        }

        $scope.$apply();
      };

      parseChatMessage = function (msg) {
        var index = msg.indexOf(":"),
          user = msg.substr(0, index),
          text = msg.substr(index+1, msg.length);
        return {
          nick : user,
          text : text
        }
      };

      this.init = function () {
        this.messages = [];
        $scope.messages = this.messages;
      };

      this.init();

      this.mandarMensaje = function () {

        var text = $scope.chatCtrl.writingMessage;
        $scope.chatCtrl.writingMessage = '';
        ws.send(loggedUser.id + ":" +text);
      }
    }]);