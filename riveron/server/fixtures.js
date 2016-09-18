
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
			'lastValue': 135,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': 16.3,
			'geolocation': null,
		},		
		{
			'station': '2018',
			'name': 'Bremgarten Right',
			'lastValue': 135,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': 16.3,
			'geolocation': null,
		},
		{
			'station': '2018',
			'name': 'Bremgarten Wehr',
			'lastValue': 135,
			'lowerLimit': 200,
			'upperLimit': 300,
			'temperature': 16.3,
			'geolocation': null,
		},
		{
			'station': '2019',
			'name': 'Brienzwiler',
			'lastValue': 70,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': 16.3,
			'geolocation': null
		},
		{
			'station': '2020',
			'name': 'Bürglen',
			'lastValue': 10,
			'lowerLimit': 60,
			'upperLimit': 100,
			'temperature': 16.3,
			'geolocation': null
		}
	];

	spots.forEach(function(spot){
		Spots.insert(spot);
	});

}