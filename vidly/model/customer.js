const mongoose = require("mongoose")
const Joi = require("joi")

const Customer = mongoose.model("customer", new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlenght: 3
    },
    phone: {
        type: String,
        required: true,
        minlenght: 5
    }
}))

const validate = (customer) => {
    const schema = {
        "name": Joi.string().min(3).required(),
        "phone": Joi.string().min(10).required()
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validate