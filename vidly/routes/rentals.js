const express = require("express")
const mongoose = require("mongoose")
const _ = require("lodash")
const { Rental, validate } = require("../model/rental")
const { Customer } = require("../model/customer")
const { Movie } = require("../model/movie")
const auth = require("../middleware/auth")
const asyncMiddleware = require("../middleware/async")

const router = express.Router()

router.get("/", auth, asyncMiddleware( async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut")
    res.send(rentals)
}))

router.post("/", auth, asyncMiddleware( async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send("The given customer ID is invalid!")

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) return res.status(400).send("The given movie ID is invalid!")

    if (movie.numberInStock === 0) return res.status(400).send("Movie not in stock")

    const rental = new Rental({
        customer: _.pick(customer, ["_id", "isGold", "name", "phone"]),
        movie: _.pick(movie, ["_id", "dailyRentalRate", "title"])
    })

    // new Fawn.Task()
    //     .save('rentals', rental)
    //     .update('movies', {_id: movie._id}, {$inc: {numberInStock: -1}})
    //     .run()

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        await rental.save({ session });
        movie.numberInStock--;
        await movie.save({ session });
        await session.commitTransaction()
        session.endSession();
        res.send(rental)
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error(err)
        res.status(500).send("Something failed: " + err.message)
    }
}))

router.get("/:id", auth, asyncMiddleware( async (req, res) => {
    const rental = await Rental.findById(req.params.id)
    if (!rental) return res.status(404).send("The rental with the given ID was not found!")
    res.send(rental)
}))

module.exports = router