transformSpots = function(dbSpots, userProfile){
	// takes spots as array from db and userprofile and transforms to correct array
	dbSpots.forEach(function(spot){
		spot.lowerLimit = userProfile.myspots[spot.name].lowerLimit;
		spot.upperLimit = userProfile.myspots[spot.name].upperLimit;
		spot.on = false;
		if(spot.lowerLimit <= spot.lastValue && spot.lastValue <= spot.upperLimit){
			spot.on = true;
		}
	});
	console.log(dbSpots);
}