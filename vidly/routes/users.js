const express = require("express")
const {User, validate} = require("../model/user")
const _ = require("lodash")

const router = express.Router()

router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const userexists = await User.findOne({email: req.body.email})
    if(userexists) return res.status(400).send("The given user is already registered")

    const user = new User(_.pick(req.body, ["name", "email", "password"]))

    await user.save()
    res.send(_.pick(user, ["name", "email"]))
})

module.exports = router