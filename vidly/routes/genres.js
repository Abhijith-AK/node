const express = require("express")
const router = express.Router()

const genres = []

router.get('/', (req, res) => res.send(genres))

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("The genre with given id is not found!")
    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(course)
    res.status(201).send(course)
})

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("The genre with given id is not found!")
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)
})

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("The genre with given id is not found!")
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})

const validate = (genre) => {
    const schema = {
        "name": Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router