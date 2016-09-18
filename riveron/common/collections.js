Spots = new Mongo.Collection('spots', 
	{
		transform: function(spot){
			spot.on = false;
			if(spot.lowerLimit <= spot.lastValue && spot.lastValue <= spot.upperLimit){
				spot.on = true;
			}
			return spot;
		}
	}
);
