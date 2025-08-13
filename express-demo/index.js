const express = require('express')
const Joi = require("joi")
const logger = require('./logger')
const morgan = require('morgan')
const helmet = require('helmet')
const config = require("config")
// debug
const debug = require('debug')('app:startup')
const courses = require('./routes/courses')
const home = require('./routes/home')

const app = express()

// view-engine
app.set('view engine', 'pug')
// path
app.set('views', './views') // default

// configuration
console.log("Application name: " + config.get("name"))
console.log("Mail server: " + config.get("mail.host"))

app.use(express.json())
app.use(express.static('public'))
app.use(helmet())
if (app.get('env') === 'development') {
    debug("Morgan enabled..")
    app.use(morgan('tiny'))
}
app.use('/', home)
app.use('/api/courses', courses)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on port ${PORT}..`))