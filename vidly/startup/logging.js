const winston = require("winston")
require("winston-mongodb")
require("dotenv").config()

module.exports = () => {

    winston.exceptions.handle(
        new winston.transports.File({filename: "uncaughtExceptions.log"}),
        new winston.transports.Console ()
    )

    winston.rejections.handle(
        new winston.transports.File({filename: "uncaughtRejections.log"}),
        new winston.transports.Console ()
    )

    process.on("uncaughtException", _ => setTimeout(() => process.exit(1), 1000))
    process.on("unhandledRejection", _ => setTimeout(() => process.exit(1), 1000))

    winston.add(new winston.transports.File({filename: 'logfile.log'}))
    winston.add(new winston.transports.MongoDB({db: process.env.MONGOSTRING}))
    winston.add(new winston.transports.Console ())
}