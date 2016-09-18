
angular.module('RiverOn').controller('SpotController', function($scope, $reactive, $stateParams, $window){
	$reactive(this).attach($scope);
	var self = this;	
	// helpers
	self.helpers({
		spot: function(){
			return Spots.findOne($stateParams.spotId);
		}	
	});

	self.back = function(){
		$window.history.back();
	};

	self.toggleChanged = function(){
		var pushEnabled = self.pushEnabled;
		var user = Meteor.user();

		// check if profile object has necessary structure already
		if(!user.profile || !user.profile.pushEntries){
			console.log('create empty profile');
			user.profile = {};
			user.profile.pushEntries = {};
		}

		// update with new push value (can put object here later)
		user.profile.pushEntries[self.spot.name] = pushEnabled;

		// update user doc in db
		Users.update(Meteor.userId(), {$set: {profile: user.profile}});
	}


	// get initial switch state
	var user = Users.findOne(Meteor.userId());
	if(!user.profile || !user.profile.pushEntries){
		self.pushEnabled = false;
	} else {
		console.log(user.profile.pushEntries[self.spot.name]);
		self.pushEnabled = user.profile.pushEntries[self.spot.name];
	}

});