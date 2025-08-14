const express = require("express")
const mongoose = require("mongoose")
const Joi = require("joi")
require("dotenv").config()
const router = express.Router()

const uri = process.env.MONGOSTRING

mongoose.connect(uri)
        .then(c => console.log("MongoDB connection success.."))
        .catch(e => console.log("MongoDB connection failed", e.message))


const GenresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Genres = mongoose.model("genres", GenresSchema)

router.get('/', async(req, res) => {
    const genres = await Genres.find()
    res.send(genres)
})

router.get('/:id', async (req, res) => {
    const genre = await Genres.findById(req.params.id) 
    if (!genre) return res.status(404).send("The genre with given id is not found!")
    res.send(genre)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = new Genres({
        name: req.body.name
    })
    const savedGenre = await genre.save()
    res.status(201).send(savedGenre)
})

router.put('/:id', async(req, res) => {
    const genre = await Genres.findById(req.params.id) 
    if (!genre) return res.status(404).send("The genre with given id is not found!")
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const updatedGenre = await Genres.findByIdAndUpdate(req.params.id,{name: req.body.name}, {new: true })
    res.send(updatedGenre)
})

router.delete('/:id', async (req, res) => {
    const genre = await Genres.findById(req.params.id)
    if (!genre) return res.status(404).send("The genre with given id is not found!")
    const index = await Genres.findByIdAndDelete(req.params.id)
    res.send(index)
})

const validate = (genre) => {
    const schema = {
        "name": Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router