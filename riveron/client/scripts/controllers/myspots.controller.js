
angular.module('RiverOn').controller('MySpotsController', function($scope, $reactive){
	$reactive(this).attach($scope);
	var self = this;

	console.log('MySpotsController called');
});
