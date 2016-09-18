
angular.module('RiverOn').config(function($stateProvider, $urlRouterProvider){
	
	// Otherwise route
	$urlRouterProvider.otherwise('/');

	// concrete
	$stateProvider.state('myspots', {
		url: '',
		templateUrl: 'client/templates/myspots.html',
		controller: 'MySpotsController as myspots'
	}).state('spot', {
		url: '/spot/:spotId',
		templateUrl: 'client/templates/spot.html',
		controller: 'SpotController as spot'
	}).state('about', {
		url: '/about',
		templateUrl: 'client/templates/about.html',
		controller: 'AboutController as about'
	});
});
