const request = require('request-promise')

module.exports = function Resolvers () {
  let app = this

  let Transactions = () => app.service('transaction')
  let Users = () => app.service('users')
  let Viewer = () => app.service('viewer')
  let Offices = () => app.service('office')

  const localRequest = request.defaults({
    baseUrl: `http://${app.get('host')}:${app.get('port')}`,
    json: true
  })

  return {
    User: {
      transactions (user, args, context) {
        return Transactions().find({
          query: {
            userId: user.id
          }
        })
        .then(result => result.data)
      }
    },
    Transaction: {
      user (transaction, args, context) {
        return Users().get(transaction.userId)
      },
      office (transaction, args, context) {
        return transaction.officeId ? Offices().get(transaction.officeId) : null
      }
    },
    AuthPayload: {
      data (auth, args, context) {
        return auth.data
      }
    },
    RootQuery: {
      viewer (root, args, context) {
        return Viewer().find(context)
      },
      user (root, { email }, context) {
        return Users().find({
          query: {
            username: email
          }
        })
        .then(users => users[0])
      },
      users (root, args, context) {
        return Users()
          .find({})
      },
      transactions (root, args, context) {
        return Transactions().find({
          query: args
        }).then(result => result.data)
      },
      transaction (root, { id }, context) {
        return Transactions().get(id)
      }
    },

    RootMutation: {
      signUp (root, args, context) {
        return Users().create(args)
      },
      logIn (root, {email, password}, context) {
        return localRequest({
          uri: '/authentication',
          method: 'POST',
          body: { strategy: 'local', username: email, password }
        }).then(res => ({
          token: res.accessToken
        }))
      },
      createTransaction (root, {transaction}, context) {
        return Transactions().create(transaction, context)
      },
      removeTransaction (root, { id }, context) {
        return Transactions().remove(id, context)
      },
      createOffice (root, args, context) {
        return Offices().create(args)
      }
    }

  }
}
