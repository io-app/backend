// Initializes the `post` service on path `/post`
const createService = require('feathers-rethinkdb')
const hooks = require('./transaction.hooks')

module.exports = function () {
  const app = this
  const Model = app.get('rethinkdbClient')
  const paginate = app.get('paginate')

  const options = {
    name: 'transaction',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/transaction', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('transaction')

  service.hooks(hooks)
}
