module.exports = {
  servers: {
    one: {
      host: '138.68.156.123',
      username: 'root',
      password: 'Riveron44'
      // or leave blank for authenticate from ssh-agent
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
    deployCheckWaitTime: 30
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};