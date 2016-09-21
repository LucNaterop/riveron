Meteor.startup(function(){
	Push.Configure({
		apn: {
			certData: Assets.getText('prodCert.pem'),
			keyData: Assets.getText('prodKey.pem'),
			passphrase: 'Riveron44',
			production: true
		}
	});
});