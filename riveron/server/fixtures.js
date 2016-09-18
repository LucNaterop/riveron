
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
			'geolocation': null,
		},		
		{
			'station': '2018',
			'name': 'Bremgarten Right',
			'lastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'geolocation': null,
		},
		{
			'station': '2018',
			'name': 'Bremgarten Wehr',
			'lastValue': 0,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': null,
			'geolocation': null,
		},
		{
			'station': '2019',
			'name': 'Brienzwiler',
			'lastValue': 0,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': null,
			'geolocation': null
		},
		{
			'station': '2020',
			'name': 'Bürglen',
			'lastValue': 0,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': null,
			'geolocation': null
		}
	];

	spots.forEach(function(spot){
		Spots.insert(spot);
	});

}