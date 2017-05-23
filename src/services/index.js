const graphql = require('./graphql/graphql.service.js')
const post = require('./post/post.service.js')
const viewer = require('./viewer/viewer.service.js')
const user = require('./user/user.service.js')
module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars
  app.configure(graphql)
  app.configure(post)
  app.configure(viewer)
  app.configure(user)
}
