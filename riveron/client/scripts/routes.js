
angular.module('RiverOn').config(function($stateProvider, $urlRouterProvider){
	
	// // Otherwise route
	// $urlRouterProvider.otherwise('/');
	console.log('router stuff');
	// concrete
	$stateProvider.state('index', {
		url: '/myspots',
		templateUrl: 'client/templates/myspots.html',
		controller: 'MySpotsController as mySpots'
	}).state('about', {
		url: '/about',
		tempalteUrl: 'client/templates/about.html'
	});
});

