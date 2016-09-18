angular.module('RiverOn', ['angular-meteor','ionic']);
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['RiverOn']);
}

if(Meteor.isCordova){
	StatusBar.overlaysWebView(true); // let status bar overlay webview
}
