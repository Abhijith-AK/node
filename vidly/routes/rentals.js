const express = require("express")
const { Rental, validate } = require("../model/rental")
const { Customer } = require("../model/customer")
const { Movie } = require("../model/movie")

const router = express.Router()

router.get("/", async (req, res) => {
    const rentals = await Rental.find().sort("-dateOut")
    res.send(rentals)
})

router.post("/", async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) return res.status(400).send("The given customer ID is invalid!")

    const movie = await Movie.findById(req.body.customerId)
    if (!movie) return res.status(400).send("The given movie ID is invalid!")

    if(movie.numberInStock === 0) return res.status(400).send("Movie not in stock")

    const rental = new Rental({
        customer: {
            _id: customer._id,
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            dailyRentalRate: movie.dailyRentalRate,
            title: movie.title
        }
    })

    const savedRental = await rental.save()
    movie.numberInStock--;
    movie.save()

    res.send(savedRental)
})

router.get("/:id", async (req, res) => {
    const rental = await Rental.findById(req.params.id)
    if(!rental) return res.status(404).send("The rental with the given ID was not found!")
    res.send(rental)
})

module.exports = router