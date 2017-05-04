// Initializes the `graphql` service on path `/graphql`
const hooks = require('./graphql.hooks')
const filters = require('./graphql.filters')

import { apolloExpress, graphiqlExpress } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import Resolvers from './resolvers'
import Schema from './schema'

module.exports = function () {
  const app = this

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  })

  // Initialize our service with any options it requires
  app.use('/graphql', apolloExpress((req) => {
    let {token, provider} = req.feathers
    return {
      schema: executableSchema,
      context: {
        token,
        provider
      }
    }
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('graphql')

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
