/**
 * Created by alejandrobarreiro on 7/10/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sbAdminApp'
 */
angular.module('sbAdminApp').controller('LoginCtrl',
    ['$scope', '$location', 'toastr',
        function ($scope, $location, toastr) {

            $scope.FBlogin = function () {
                FB.login(function (response) {
                    if (response.authResponse) {

                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', {fields: ['first_name', 'last_name', 'email']}, function (response) {
                            toastr.success('Bienvenido ' + response.first_name + "!");
                            console.log(response);
                            var accessToken = FB.getAuthResponse().accessToken;
                            console.log(accessToken);
                            //authFact.setAccessToken(accessToken);
                            $location.path('dashboard.home');
                        });
                    } else {
                        toastr.error('User cancelled login or did not fully authorize.');
                    }
                });
            };

        }]);