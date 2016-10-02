
Meteor.startup(function(){
	if(Spots.find().count() == 0){
		insertFixtures();
	}
});

insertFixtures = function(){
	
	var spots = [
		{
			'station': '2018',
			'name': 'Bremgarten Left',
			'lastValue': 0,
			'beforeLastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'coordinates': { 'latitude': 47.3560239, 'longitude': 8.339947},
		},		
		{
			'station': '2018',
			'name': 'Bremgarten Right',
			'lastValue': 0,
			'beforeLastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'coordinates': { 'latitude': 47.3558399, 'longitude': 8.339947},
		},
		{
			'station': '2018',
			'name': 'Bremgarten Wehr',
			'lastValue': 0,
			'beforeLastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'coordinates': { 'latitude': 47.3500019, 'longitude': 8.3414422},
		},
		{
			'station': '2019',
			'name': 'Brienzwiler',
			'lastValue': 0,
			'beforeLastValue': 0,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': null,
			'coordinates': { 'latitude': 46.746488, 'longitude': 8.101343},
		},
		{
			'station': '2020',
			'name': 'Bürglen',
			'lastValue': 0,
			'beforeLastValue': 0,
			'lowerLimit': 300,
			'upperLimit': 800,
			'temperature': null,
			'coordinates': { 'latitude': 47.5463829, 'longitude': 9.1477213},
		}
	];


	spots.forEach(function(spot){
		Spots.insert(spot);
	});

}