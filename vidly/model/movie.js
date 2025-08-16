const mongoose = require("mongoose")
const Joi = require("joi")
const { genreSchema } = require("./genre")

const Movie = mongoose.model("movie", new mongoose.Schema({
    genre: {
        type: genreSchema,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlenght: 5,
        maxlength: 255
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}))

const validate = (movie) => {
    const schema = {
        "title": Joi.string().min(5).max(255).required(),
        "genreId": Joi.string().required(),
        "numberInStock": Joi.number().min(0).max(255).required(),
        "dailyRentalRate": Joi.number().min(0).max(255).required(),
    }
    return Joi.validate(movie, schema)
}

exports.Movie = Movie
exports.validate = validate