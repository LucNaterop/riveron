
Meteor.startup(function(){
  Push.Configure({
    android: {
      senderID: 12341234,
      alert: true,
      badge: true,
      sound: true,
      vibrate: true,
      clearNotifications: true
      // icon: '',
      // iconColor: ''
    },
    ios: {
      alert: true,
      badge: true,
      sound: true
    }
  });
});
