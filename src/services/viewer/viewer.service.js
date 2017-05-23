// Initializes the `viewer` service on path `/viewer`
const hooks = require('./viewer.hooks')

class Service {
  constructor (options) {
    this.options = options || {}
  }

  find (params) {
    return Promise.resolve(params.user)
  }
}

module.exports = function () {
  const app = this

  app.use('/viewer', new Service())

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('viewer')

  service.hooks(hooks)
}
