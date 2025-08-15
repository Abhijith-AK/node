const mongoose = require("mongoose")

const Rental = mongoose.model("rental", new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlenght: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now().toLocaleString(),
        required: true
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}))

const validate = (movie) => {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required(),
    }
    return Joi.validate(customer, schema)
}

exports.Rental = Rental
exports.validate = validate