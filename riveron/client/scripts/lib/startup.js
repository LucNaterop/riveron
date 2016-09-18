Meteor.startup(function(){
	if(! localStorage.getItem('user')){
		console.log('creating a new user');
		localStorage.setItem('user',Random.id());
		var user = localStorage.getItem('user');
		Accounts.createUser({username: user, password: '123456789'}, function(){
			console.log('created new user');
			login();
		});
	} else {
		login();
	}
});

function login(){
	var user = localStorage.getItem('user');
	Meteor.loginWithPassword(user, '123456789');
}
