
Meteor.startup(function(){
	if(Spots.find().count() == 0){
		insertFixtures();
	}
});

function insertFixtures(){
	
	var spots = [
		{
			'station': '2018',
			'name': 'Bremgarten Left',
			'lastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'geolocation': { 'lat': 47.355233, 'long': 8.331453},
		},		
		{
			'station': '2018',
			'name': 'Bremgarten Right',
			'lastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'geolocation': { 'lat': 47.355233, 'long': 8.331453},
		},
		{
			'station': '2018',
			'name': 'Bremgarten Wehr',
			'lastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'geolocation': { 'lat': 47.355233, 'long': 8.331453},
		},
		{
			'station': '2019',
			'name': 'Brienzwiler',
			'lastValue': 0,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': null,
			'geolocation': { 'lat': 46.746488, 'long': 8.101343},
		},
		{
			'station': '2020',
			'name': 'Bürglen',
			'lastValue': 0,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': null,
			'geolocation': { 'lat': 46.863324, 'long': 8.630779},
		}
	];

	spots.forEach(function(spot){
		Spots.insert(spot);
	});

}