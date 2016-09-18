angular.module('RiverOn').filter('capitalize', function(){
	return function(text){
		return text.toUpperCase();
	};
});