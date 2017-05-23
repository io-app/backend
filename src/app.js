const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const logger = require('./hooks/logger')

const feathers = require('feathers')
const auth = require('feathers-authentication')
const jwt = require('feathers-authentication-jwt')
const local = require('feathers-authentication-local')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const socketio = require('feathers-socketio')

const middleware = require('./middleware')
const services = require('./services')

const rethinkdb = require('./rethinkdb')

const app = feathers()

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')))
// Enable CORS, security, compression, favicon and body parsing
app.use(cors())
app.use(helmet())
app.use(compress())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', feathers.static(app.get('public')))

// Set up Plugins and providers
app.configure(hooks())
app.configure(rethinkdb)
app.configure(rest())
app.configure(socketio())
app.configure(auth(app.get('authentication')))
app.configure(local())
app.configure(jwt())

app.service('authentication').hooks({
  before: {
    create: [
      // You can chain multiple strategies
      auth.hooks.authenticate(['jwt', 'local'])
    ],
    remove: [
      auth.hooks.authenticate('jwt')
    ]
  }
})

// Set up our services (see `services/index.js`)
app.configure(services)
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware)
app.hooks({
  after: {
    all: [ logger() ]
  },

  error: {
    all: [ logger() ]
  }
})

module.exports = app
