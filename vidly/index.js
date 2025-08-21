const express = require('express')
const mongoose = require("mongoose")
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const genres = require("./routes/genres")
const customers = require("./routes/customers")
const movies = require("./routes/movies")
const rentals = require("./routes/rentals")
const users = require("./routes/users")
const auth = require("./routes/auth")
require("dotenv").config()
const config = require("config")

if (!config.get("jwtPrivateKey")) {
        console.error("Fatal err: jwtPrivateKey is not defined ")
        process.exit(1)
}

const uri = process.env.MONGOSTRING

mongoose.connect(uri)
        .then(c => console.log("MongoDB connection success.."))
        .catch(e => console.log("MongoDB connection failed", e.message))

const app = express()

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use("/api/users", users)
app.use("/api/auth", auth)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started running on port ${PORT}!`))