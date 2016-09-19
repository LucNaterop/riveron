/*

So basically the way this works is the following:

First we check if there is a user in localstorage.
If yes, then login with that user and check if profile structure exists
If no, then add new user to localStoraage. Then, create a new user in the database.
Next, login with that user. And now create profile structure.

*/


Meteor.startup(function(){
	if(!localStorage.getItem('user')){
		createLocalUser();
		createUser();
	} else {
		login();
	}
});

function login(){
	var user = localStorage.getItem('user');
	Meteor.loginWithPassword(user, '123456789', function(){
		if(!Meteor.user().profile){
			// add profile structure to user doc
			var profile = {};
			profile.myspots = {};
			Users.update(Meteor.userId(), {$set: {'profile': profile }});
		}
	});
}

function createLocalUser(){
	console.log('created new user in localstorage');
	localStorage.setItem('user',Random.id());
}

function createUser(){
	console.log('created new user on server');
	var user = localStorage.getItem('user');
	Accounts.createUser({username: user, password: '123456789'}, function(){
		login();

	});
}