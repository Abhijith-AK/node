const config = require("config")

module.exports = () => {
    if (!config.get("jwtPrivateKey")) {
        throw Error("Fatal err: jwtPrivateKey is not defined ")
    }
}