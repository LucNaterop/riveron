import { Meteor } from 'meteor/meteor';
import xml2js from 'xml2js';
import cron from 'cron';

Meteor.startup(() => {
	var job = new cron.CronJob('00 00 8,16 * * *', Meteor.bindEnvironment(function(){
		// do notifications each day at 8:00 and at 16:00
		doNotifications();
	}), null, true, 'Europe/Amsterdam');
});

Meteor.startup(function(){
	// update the spots every two hours
	// updateSpots();
	Meteor.setInterval(function(){
		updateSpots();
	}, 1000*3600*2);
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
			        badge: 1, //optional, set it when app is in background.
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

	var result = HTTP.get('http://www.hydrodata.ch/data/xml/hydroweb.xml', {
		timeout:5000, 
		auth: 'naterop:bru69?forces'
	});

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

				// keep the value in beforeLastValue
				Spots.update({'_id': spot._id}, {$set: {'beforeLastValue': spot.lastValue}});

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

/*
So how the hell should we do push notifications? Let's always keep as much as possible constant and then
start varying stuff. So what if everything stays constant? What if abfluss does not change, and if the
limits do not change? 
Well then, easy: When lastValue is within the range (that is, bigger equal the lower limit and smaller
equal the upper limit) then we send a push notification each morning or so. And when the lastValue is outside
of the range, then we don't. Simple. Easy. That's clear. Okey. 
Now we keep the limits constant but vary abfluss. So what if lastValue suddenly comes into range? Well then,
we write ONE notification at whatever time that shit happens. And if it doesn't then we don't write. 
Now what if we keep the lastValue constant and changed the range? Well then, again, if the lastValue ENTERS 
the range (which is now suddenly different) then we also just send one notification. But no no no no no,
wait. In this case, the user is actively using the app at that very moment where the range changes, because
the range can only change through a user interaction. So if the user is inside the app, we don't have to send
a motherfucking push notification. In fact, the user won't even see it if we send one because of the way
those notifications are handled by the operating system. So no! In that case, we do not need to send one.
Which is cool. So we only need to send notifications at two possible events:
Event A: lastValue is within range and it is early in the morning
Event B: lastValue just entered the range because of a change in abfluss. 

*/