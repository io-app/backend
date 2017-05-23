const auth = require('feathers-authentication')
const { associateCurrentUser, restrictToOwner } = require('feathers-authentication-hooks')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      auth.hooks.authenticate('jwt'),
      associateCurrentUser({idField: 'id', as: 'userId'})
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'userId' })
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'userId' })
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: 'userId' })
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
