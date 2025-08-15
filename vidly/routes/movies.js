const express = require("express")
const { Movie, validate } = require("../model/movie")
const { Genre } = require("../model/genre")

const router = express.Router()

router.get('/', async (req, res) => {
    const movies = await Movie.find()
    res.send(movies)
})

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).send("The movie with given id is not found!")
    res.send(movie)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre.")

    const movie = new Movie({
        genre: {
            _id: genre._id,
            name: genre.name
        },
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    const savedmovie = await movie.save()
    res.status(201).send(savedmovie)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            genre: {
                _id: genre._id,
                name: genre.name
            },
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true })
    if (!movie) return res.status(404).send("The movie with given id is not found!")
    return res.send(movie)
})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if (!movie) return res.status(404).send("The movie with given id is not found!")
    return res.send(movie)
})

module.exports = router