import { Meteor } from 'meteor/meteor';
import xml2js from 'xml2js';

Meteor.startup(() => {
	
});

Meteor.methods({
	'updateSpots': function(){

		console.log('getting hydrodata...');

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
			})
			// update document in database
		})

		return hydrodata;
	}
});
