const graphql = require('./graphql/graphql.service.js')
const transaction = require('./transaction/transaction.service.js')
const viewer = require('./viewer/viewer.service.js')
const user = require('./user/user.service.js')
const office = require('./office/office.service.js')

module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars
  app.configure(graphql)
  app.configure(transaction)
  app.configure(viewer)
  app.configure(user)
  app.configure(office)
}
