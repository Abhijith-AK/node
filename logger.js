var url = "http://logger.io/log"

function logger(message) {
    // send http request
    console.log(message)
}

module.exports.logger = logger