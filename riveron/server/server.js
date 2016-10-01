import { Meteor } from 'meteor/meteor';
import xml2js from 'xml2js';

Meteor.startup(() => {
	Meteor.setInterval(function(){
		updateSpots();
	}, 1000*3600*2)
});

Meteor.startup(function(){
	Meteor.setInterval(function(){
		doNotifications();
	}, 1000*3600*12 /60);
});

Push.debug = true;

Meteor.methods({
	'updateSpots': function(){
		updateSpots();
	},
	'doNotifications': function(){
		doNotifications();
	},
	'notify': function(){
        Push.send({
            from: 'push',
            title: 'Hello World',
            text: 'Watup',
            badge: 1,
            sound: 'airhorn.caf',
            query: {
            }
        });
	},
	'wipeDatabase': function(){
		Spots.remove({});
		insertFixtures();
	}
});

function doNotifications(){
	console.log('doing the notifications...');
	// this function informs all users via push
	var users = Users.find().fetch();
	users.forEach(function(user){
		var myspots = user.profile.myspots
		for( var prop in myspots ) {
			var value = Spots.findOne({'name': prop}).lastValue;
			var spot = myspots[prop];
			if(spot.pushEnabled && spot.lowerLimit <= value && value <= spot.upperLimit){
				console.log('sending push notification to '); 
				console.log(user);
				// then let's do a notification
			    Push.send({
			        from: 'River On',
			        title: 'River On!',
			        text: prop + ' is now ON with ' + value + ' m3/s',
			        badge: 1, //optional, use it to set badge count of the receiver when the app is in background.
			        query: {
			            // Ex. send to a specific user if using accounts:
			            userId: user._id
			        } // Query the appCollection
			        // token: appId or token eg. "{ apn: token }"
			        // tokens: array of appId's or tokens
			        // payload: user data
			        // delayUntil: Date
			    });
			}
		}
	});
	console.log('done. ');
}

function updateSpots(){
	// this function updates all the spots in the database
	console.log('Updating spots...');

	var result = HTTP.get('http://www.hydrodata.ch/data/xml/hydroweb.xml', {timeout:5000, auth: 'naterop:bru69?forces'});

	var hydrodata = null;

	xml2js.parseString(result.content, function(error, res){
		hydrodata = res;
	});

	var spots = Spots.find().fetch();
	spots.forEach(function(spot){
		// search corresponding spot in new data array
		hydrodata.locations.station.forEach(function(station){
			
			if(spot.station == station.$.number){
				console.log('found data for ' + spot.station);

				// find abfluss parameter
				station.parameter.forEach(function(parameter){
					if(parameter.$.name == 'Abfluss m3/s'){
						// update Value in database

						Spots.update({'_id': spot._id}, {$set: {'lastValue': parameter.value[0]._ / 1.0}});
						console.log(parameter.value[0]._ / 1.0 + ' m/s');
					}
					if(parameter.$.name == 'Temperatur'){
						Spots.update({'_id': spot._id}, {$set: {'temperature': parameter.value[0]._ / 1.0}});
					}
				});
			}
		});
	});
	console.log('done. ');
}