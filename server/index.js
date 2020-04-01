const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const models = require('./models/index.js')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(session({
    secret: '2846a1147ee83fba8e21f03f',
    resave: false,
    saveUninitialized: false
  }))

  var testRoutes = require('./routes/test');

  app.use('/api/test', testRoutes);

  app.post('/api/users', [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json(errors)
    }

    try { 
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(req.body.password, salt)
      models.Users.create({
        email: req.body.email,
        password: hash
      })

      req.session.user = {
        isAuthenticated: true
      }

      res.status(200).json(req.session.user)
    } catch(err) {
      return res.status(422).json(err)
    }
  })

  app.post('/api/users/login', [
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json(errors)
    } else {
      const user = await models.Users.findOne({
        where: {
          email: req.body.email
        }
      })

      if (!user) {
        res.status(401).end('Email does not exist')
      }

      const isValid = await bcrypt.compare(req.body.password, user.password)
      if (isValid === false) {
        res.status(401).end('username or password invalid')
      }
      req.session.user = {
        isAuthenticated: true
      }

      res.json(req.session.user)
    }
  })


  app.post('/api/logout',(req, res) => {
    req.session.destroy((err) => {
      res.end()
    })
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
