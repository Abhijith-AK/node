const express = require('express')
const router = express.Router()

const courses = []

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c === parseInt(req.params.id))
    if (!course) res.status(404).send("The course doesn't exist")
    res.send(course)
})

router.post('/', (req, res) => {
    if (!req.body) res.status(400).send("body is required")
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

router.put('/:id', (req, res) => {
    // find
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("The course doesn't exist")
    // validate
    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    // update
    course.name = req.body.name
    res.send(course)
})

router.delete("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("The course doesn't exist")
    const courseIndex = courses.indexOf(course)
    courses.splice(courseIndex, 1)
    res.send(course)
})


const validate = (course) => {
    const schema = {
        "name": Joi.string().min(3).required()
    }
    return Joi.validate(course, schema)
}

module.exports = router