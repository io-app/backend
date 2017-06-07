const auth = require('feathers-authentication')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      auth.hooks.authenticate('jwt')
    ],
    update: [
      auth.hooks.authenticate('jwt')
    ],
    patch: [
      auth.hooks.authenticate('jwt')
    ],
    remove: [
      auth.hooks.authenticate('jwt')
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
