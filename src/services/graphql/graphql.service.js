// Initializes the `graphql` service on path `/graphql`
const { apolloExpress, graphiqlExpress } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const Resolvers = require('./resolvers')
const Schema = require('./schema')

module.exports = function () {
  const app = this

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  })

  // Initialize our service with any options it requires
  app.use('/graphql', apolloExpress((req) => {
    let {headers: {authorization}, provider} = req.feathers
    return {
      schema: executableSchema,
      context: {
        provider,
        headers: {
          authorization
        }
      }
    }
  }))

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }))
}
