const express = require('express')
const Joi = require('joi')
const genres = require("./routes/genres")

const app = express()

app.use(express.json())
app.use('/api/genres', genres)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started running on port ${PORT}!`))