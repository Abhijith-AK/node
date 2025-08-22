const express = require('express')
const wiston = require('winston')
const app = express()

require('./startup/logging')()
require('./startup/config')()
require("./startup/routes")(app)
require('./startup/db')()
require('./startup/validation')()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => wiston.log("info",`Server started running on port ${PORT}!`))