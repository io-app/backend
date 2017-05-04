const hooks = require('feathers-hooks')
const auth = require('feathers-authentication').hooks

module.exports = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
    all: [
      hooks.remove('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
