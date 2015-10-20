'use strict';
/**
 * @ngdoc function
 * @name sapoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sapoApp
 */
angular.module('sapoApp')
  .controller('ChartCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.line = {
	    labels: ['Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	    series: ['Almacen 1', 'Almacen 2', 'Almacen 3'],
	    data: [
	      [65, 59, 80, 81, 56, 55, 40],
	      [28, 48, 40, 19, 86, 27, 90],
				[40, 20, 30, 45, 67, 60, 70],
	    ],
	    onClick: function (points, evt) {
	      console.log(points, evt);
	    }
    };

    $scope.bar = {
			labels: ['Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
			series: ['Almacen 1', 'Almacen 2', 'Almacen 3'],

		data: [
		   [65, 59, 80, 81, 56, 55, 40],
		   [28, 48, 40, 19, 86, 27, 90],
			 [40, 20, 30, 45, 67, 60, 70],
		]
    	
    };

    //$scope.donut = {
    //	labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    //	data: [300, 500, 100]
    //};
    //
    //$scope.radar = {
    //	labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    //
    //	data:[
    //	    [65, 59, 90, 81, 56, 55, 40],
    //	    [28, 48, 40, 19, 96, 27, 100]
    //	]
    //};
    //
    //$scope.pie = {
    //	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
    //	data : [300, 500, 100]
    //};
    //
    //$scope.polar = {
    //	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
    //	data : [300, 500, 100, 40, 120]
    //};
    //
    //$scope.dynamic = {
    //	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
    //	data : [300, 500, 100, 40, 120],
    //	type : 'PolarArea',
    //
    //	toggle : function ()
    //	{
    //		this.type = this.type === 'PolarArea' ?
    //	    'Pie' : 'PolarArea';
    //}
    //};
}]);