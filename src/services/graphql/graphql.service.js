// Initializes the `graphql` service on path `/graphql`
const fs = require('fs')
const path = require('path')
const { apolloExpress, graphiqlExpress } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

module.exports = function () {
  const app = this
  const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers: resolvers.call(app)
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
