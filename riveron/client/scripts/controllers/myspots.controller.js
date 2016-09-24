
angular.module('RiverOn').controller('MySpotsController', function($scope, $reactive){
	$reactive(this).attach($scope);
	var self = this;
	

	self.helpers({
		spots: function(){
			if(Meteor.user()){
				var myspots = Meteor.user().profile.myspots;
			}
				var allspots = Spots.find().fetch();
				var projection = [];
				allspots.forEach(function(spot){
					if(myspots[spot.name]){
						spot.lowerLimit = myspots[spot.name].lowerLimit;
						spot.upperLimit = myspots[spot.name].upperLimit;
						spot.on = false;
						if(spot.lowerLimit <= spot.lastValue && spot.lastValue <= spot.upperLimit){
							spot.on = true;
						}
						projection.push(spot); 
					}
				});

			return projection;
		}
	});

	self.delete = function(spotName){
		var profile = Meteor.user().profile;
		delete profile.myspots[spotName];
		Users.update(Meteor.userId(), {$set: {'profile': profile}});
	}
});
