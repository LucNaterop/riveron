
angular.module('RiverOn').controller('AddSpotsController', function($scope, $reactive, $ionicHistory, $ionicBackdrop){
	$reactive(this).attach($scope);
	var self = this;

	self.helpers({
		'spots': function(){
			console.log('running helper');
			var myCoordinates = Geolocation.latLng();
			var spots = Spots.find().fetch();
			if(myCoordinates){
				myCoordinates.latitude = myCoordinates.lat;
				myCoordinates.longitude = myCoordinates.lng;
				// means that user wants to sort by geolocation, thus we sort the spots array by distance
				console.log('Ok chef, lets sort by distance then');
				spots.sort(function(s1, s2){
					return distanceSquared(myCoordinates, s1.coordinates) - distanceSquared(myCoordinates, s2.coordinates);
				});

				// attach distance
				spots.forEach(function(spot){
					var distance = distanceInKM(myCoordinates.latitude, myCoordinates.longitude, spot.coordinates.latitude, spot.coordinates.longitude);
					spot.distance = Math.round(distance);
				});

			} else {
				console.log('sorted alphabetically');
			}
			return spots;
		},
		'myspots': function(){
			return Users.findOne(Meteor.userId()).profile.myspots;
		}
	});

	self.back = function(){
		$ionicHistory.goBack();
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
		$ionicHistory.goBack();
	};
});


function distanceSquared(coord1, coord2){
	// returns distance squared between coord1 and coord2
	var xsquared = Math.pow(coord1.latitude-coord2.latitude, 2);
	var ysquared = Math.pow(coord1.longitude - coord2.longitude, 2);
	return xsquared + ysquared;
}

function distanceInKM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

