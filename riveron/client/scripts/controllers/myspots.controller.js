
angular.module('RiverOn').controller('MySpotsController', function($scope, $reactive){
	$reactive(this).attach($scope);
	var self = this;
	
	self.helpers({
		spots: function(){
			return Spots.find().fetch();
		}
	});
	
	self.add = function(){
		console.log('fired');
	};
	
});
