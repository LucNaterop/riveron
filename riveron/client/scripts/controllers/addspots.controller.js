
angular.module('RiverOn').controller('AddSpotsController', function($scope, $reactive, $window){
	$reactive(this).attach($scope);
	var self = this;

	self.helpers({
		'spots': function(){
			return Spots.find().fetch();
		},
		'myspots': function(){

			return Users.findOne(Meteor.userId()).profile.myspots;
		}
	})

	self.back = function(){
		$window.history.back();
	};

	self.addSpot = function(spotName){
		var profile = Users.findOne(Meteor.userId()).profile;
		var spot = Spots.findOne({'name': spotName});
		profile.myspots[spotName] = {
			'pushEnabled': true, 
			'lowerLimit': spot.lowerLimit, 
			'upperLimit': spot.upperLimit
		};
		Users.update(Meteor.userId(), {$set: {'profile': profile}});
		$window.history.back();
	};

});
