// Initializes the `viewer` service on path `/viewer`
const createService = require('feathers-rethinkdb')
const hooks = require('./viewer.hooks')

module.exports = function () {
  const app = this
  const Model = app.get('rethinkdbClient')
  const paginate = app.get('paginate')

  const options = {
    name: 'viewer',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/viewer', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('viewer')

  service.hooks(hooks)
}
