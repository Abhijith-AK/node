const express = require('express')
const mongoose = require("mongoose")
const genres = require("./routes/genres")
require("dotenv").config()

const uri = process.env.MONGOSTRING

mongoose.connect(uri)
        .then(c => console.log("MongoDB connection success.."))
        .catch(e => console.log("MongoDB connection failed", e.message))

const app = express()

app.use(express.json())
app.use('/api/genres', genres)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started running on port ${PORT}!`))