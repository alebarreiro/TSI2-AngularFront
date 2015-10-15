/**
 * Created by alejandrobarreiro on 7/10/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name sapoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sapoApp'
 */
angular.module('sapoApp').controller('LoginCtrl',
    ['$scope', '$location', 'toastr', 'authService',
        function ($scope, $location, toastr, authService) {

            $scope.FBlogin = function () {
                authService.doFacebookLogin();
            };

            $scope.login = function () {
                console.log($scope.user.id);
                authService.tradicionalLogin($scope.user.id);
            };

        }]);