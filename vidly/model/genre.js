const mongoose = require("mongoose")
const Joi = require("joi")

const genreSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Genre = mongoose.model("genres", genreSchema)

const validate = (genre) => {
    const schema = {
        "name": Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

exports.genreSchema = genreSchema 
exports.Genre = Genre
exports.validate = validate