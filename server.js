require('dotenv').config({path: './process.env'})
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const myDB = require('./connection')
const mongo = require('mongodb').MongoClient
const routes = require('./routes.js')
const auth = require('./auth.js')
const MongoStore = require('connect-mongo')(session)
const URI = process.env.MONGO_URI
const store = new MongoStore({url: URI})
const passportSocketIo = require('passport.socketio')
const cookieParser = require('cookie-parser')

const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http)
app.use('/public', express.static(process.cwd() + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false},
    key: 'express.sid',
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

io.use(
    passportSocketIo.authorize({
      cookieParser: cookieParser,
      key: 'express.sid',
      secret: process.env.SESSION_SECRET,
      store: store,
      success: onAuthorizeSuccess,
      fail: onAuthorizeFail
    })
  );
