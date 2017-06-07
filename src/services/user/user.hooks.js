const auth = require('feathers-authentication')
const local = require('feathers-authentication-local')
// const { discard } = require('feathers-hooks-common')
const { restrictToOwner } = require('feathers-authentication-hooks')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [local.hooks.hashPassword()],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'id' })
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'id' })
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'id' })
    ]
  },

  after: {
    // all: [discard('password')],
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
