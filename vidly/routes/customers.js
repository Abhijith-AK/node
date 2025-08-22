const express = require("express")
const _ = require("lodash")
const {Customer, validate} = require("../model/customer")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

const router = express.Router()

router.get('/', auth, async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

router.get('/:id', auth, async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("The customer with given id is not found!")
    res.send(customer)
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = new Customer (_.pick(req.body, ["isGold", "name", "phone"]))
    await customer.save()
    res.status(201).send(customer)
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        _.pick(req.body, ["isGold", "name", "phone"]),
        { new: true })
    if (!customer) return res.status(404).send("The customer with given id is not found!")
    return res.send(customer)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send("The customer with given id is not found!")
    return res.send(customer)
})

module.exports = router