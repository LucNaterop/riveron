
angular.module('RiverOn').controller('SpotController', function($scope, $reactive, $stateParams, $window){
	$reactive(this).attach($scope);
	var self = this;

	self.helpers({
		spot: function(){
			return Spots.findOne($stateParams.spotId);
		}
	});

	self.back = function(){
		$window.history.back();
	};
});