require("dotenv").config()
const mongoose = require("mongoose")
const winston= require("winston")

module.exports = () => {
    const uri = process.env.MONGOSTRING

    mongoose.connect(uri)
        .then(_ => winston.log("info", "MongoDB connection success.."))

}