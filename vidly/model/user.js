const mongoose = require("mongoose")
const Joi = require("joi")

const User = mongoose.model("users", new mongoose.Schema({
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
}))

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