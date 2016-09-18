
angular.module('RiverOn').controller('AboutController', function($scope, $reactive, $window){
	$reactive(this).attach($scope);
	var self = this;

	self.back = function(){
		$window.history.back();
	}

});