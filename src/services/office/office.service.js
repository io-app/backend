// Initializes the `post` service on path `/post`
const createService = require('feathers-rethinkdb')
const hooks = require('./office.hooks')

module.exports = function () {
  const app = this
  const Model = app.get('rethinkdbClient')

  const options = {
    name: 'office',
    Model
  }

  // Initialize our service with any options it requires
  app.use('/office', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('office')

  service.hooks(hooks)
}
