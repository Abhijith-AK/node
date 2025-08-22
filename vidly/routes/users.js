const express = require("express")
const {User, validate} = require("../model/user")
const _ = require("lodash")
const bcrypt = require("bcryptjs")
const auth = require("../middleware/auth")
const asyncMiddleware = require("../middleware/async")

const router = express.Router()

router.get("/me", auth, asyncMiddleware( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
}))

router.post("/", asyncMiddleware( async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const userexists = await User.findOne({email: req.body.email})
    if(userexists) return res.status(400).send("The given user is already registered")

    const user = new User(_.pick(req.body, ["name", "email", "password"]))

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = user.generateToken()

    res.header('x-auth-token', token).send(_.pick(user, ["name", "email"]))
}))

module.exports = router