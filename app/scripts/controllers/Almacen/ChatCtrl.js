/**
 * Created by alejandrobarreiro on 24/10/15.
 */
angular.module('sapoApp')
  .controller('ChatCtrl', [ '$scope', 'toastr',
    function ($scope, toastr) {

      this.init = function () {
        this.messages = [
          {
            username: 'Ale',
            text: 'Hola',
            date: Date()
          },
          {
            username: 'Jhon',
            text: 'Chau',
            date: Date()
          }
        ];
        $scope.messages = this.messages;
      };

      this.init();

      this.mandarMensaje = function () {
        console.log("quiere mandar mensaje");
        console.log($scope);
        var msg = {
          username: 'Yo',
          text: $scope.chatCtrl.writingMessage,
          date: Date()
        };
        $scope.chatCtrl.writingMessage = '';
        $scope.chatCtrl.messages.push(msg);
      }
    }]);