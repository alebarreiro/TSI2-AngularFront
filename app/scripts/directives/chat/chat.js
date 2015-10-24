'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sapoApp')
	.directive('chat',function(){
		var directive = {
        templateUrl:'scripts/directives/chat/chat.html',
        restrict: 'EA',
        replace: true,
				scope: {
					//messages: '=',
					username: '=',
					date: '=',
					text: '=',
					mandarMensaje: '&'
				},
				controller: 'ChatCtrl',
				controllerAs: 'chatCtrl'
    	};

		return directive;
	});