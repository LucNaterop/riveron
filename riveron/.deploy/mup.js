module.exports = {
  servers: {
    one: {
      host: '138.68.156.123',
      username: 'root',
      password: 'Riveron44'
    }
  },

  meteor: {
    name: 'riveron',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://138.68.156.123',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',

    deployCheckWaitTime: 100
  }

};