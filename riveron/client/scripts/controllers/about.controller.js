
angular.module('RiverOn').controller('AboutController', function($scope, $reactive, $ionicHistory){
	$reactive(this).attach($scope);
	var self = this;

	self.back = function(){
		 $ionicHistory.goBack();
	}

});