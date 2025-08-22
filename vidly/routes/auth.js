const express = require("express")
const {User} = require("../model/user")
const Joi = require("joi")
const bcrypt = require("bcryptjs")
const asyncMiddleware = require("../middleware/async")

const router = express.Router()

router.post("/", asyncMiddleware( async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("The given email or password is incorrect !")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("the given email or password is incorrect !")
    
    const token = user.generateToken()

    res.send(token)
}))


const validate = (user) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema)
}

module.exports = router