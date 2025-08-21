const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const config = require("config")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength:8
    }
})

userSchema.methods.generateToken = function(){
    return jwt.sign({_id: this._id}, config.get("jwtPrivateKey"))
}

const User = mongoose.model("users", userSchema)

const validate = (user) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema)
}

exports.User = User;
exports.validate = validate;