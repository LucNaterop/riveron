
angular.module('RiverOn').controller('SpotController', function($scope, $reactive, $stateParams, $ionicHistory, $ionicPopup, $ionicBackdrop, $ionicModal){
	$reactive(this).attach($scope);
	var self = this;	
	// helpers
	self.helpers({
		spot: function(){
			var dbspot = Spots.findOne($stateParams.spotId);
			var user = Meteor.user();
			var spot = {};
			spot.name = dbspot.name;
			spot.lastValue = dbspot.lastValue;
			spot.lowerLimit = user.profile.myspots[dbspot.name].lowerLimit;
			spot.upperLimit = user.profile.myspots[dbspot.name].upperLimit;
			spot.temperature = dbspot.temperature;
			spot.on = false;
			if(spot.lowerLimit <= spot.lastValue && spot.lastValue <= spot.upperLimit){
				spot.on = true;
			}
			return spot;
		}
	});

	self.back = function(){
		$ionicHistory.goBack();
	};

	self.toggleChanged = function(){
		$ionicBackdrop.retain();
		var user = Meteor.user();
		
		// update with new push value (can put object here later)
		user.profile.myspots[self.spot.name].pushEnabled = self.pushEnabled;

		// update user doc in db
		Users.update(Meteor.userId(), {$set: {profile: user.profile}}, function(){
			Meteor.setTimeout(function(){
				$ionicBackdrop.release();
			}, 1000);			
		});
	};

	// get initial switch state
	var user = Users.findOne(Meteor.userId());
	self.pushEnabled = user.profile.myspots[self.spot.name].pushEnabled;
	Spots.findOne($stateParams.spotId);

	var spot = Spots.findOne($stateParams.spotId);
	// load google maps 
	var myLatlng = new google.maps.LatLng(spot.coordinates.latitude, spot.coordinates.longitude);
	var mapOptions = {
		center: myLatlng,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
		'map': map,
		'draggable': false,
		'animation': google.maps.Animation.DROP,
		'position': {'lat': spot.coordinates.latitude, 'lng': spot.coordinates.longitude}
	})

	self.editLimits = function(){
		var newLowerLimit = undefined;
		var newUpperLimit = undefined;

		$ionicPopup.prompt({
			title: 'Lower Limit',
			template: 'Enter a lower limit in m3/s for when this spot is ON.',
			inputType: 'number',
			inputPlaceholder: ' m3/s',
			cancelType: 'button-light',
			okText: 'Save'
		}).then(function(lowerLimitRes) {
			if(lowerLimitRes){
				newLowerLimit = lowerLimitRes;
			}
			$ionicPopup.prompt({
				title: 'Upper Limit',
				template: 'Enter an upper limit in m3/s for when this spot is ON',
				inputType: 'number',
				inputPlaceholder: ' m3/s',
				cancelType: 'button-light',
				okText: 'Save'

			}).then(function(upperLimitRes){

				$ionicBackdrop.retain();

				if(upperLimitRes){
					newUpperLimit = upperLimitRes;
				}

				// and now update the profile with newLowerLimit and newUpperLimit if they are defined
				var profile = Meteor.user().profile;

				if(newLowerLimit){
					profile.myspots[self.spot.name].lowerLimit = newLowerLimit;
				}
				if(newUpperLimit){
					profile.myspots[self.spot.name].upperLimit = newUpperLimit;
				}

				Users.update({'_id': Meteor.userId()}, {$set: {'profile': profile }}, function(){
					Meteor.setTimeout(function(){
						$ionicBackdrop.release();
					}, 1000);
				});

			});
		});
	};

	$scope.closeModal = function(){
		$scope.modal.hide();
	}

	$ionicModal.fromTemplateUrl('client/templates/modals/pushinfo.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	self.showPushInfo = function(){
		$scope.modal.show();
	}
});

