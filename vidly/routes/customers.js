const express = require("express")
const {Customer, validate} = require("../model/customer")

const router = express.Router()

router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("The customer with given id is not found!")
    res.send(customer)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
const validate = (customer) => {
    const schema = {
        "name": Joi.string().min(3).required(),
        "phone": Joi.string().min(10).required()
    }
    return Joi.validate(customer, schema)
}

    const savedCustomer = await customer.save()
    res.status(201).send(savedCustomer)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        },
        { new: true })
    if (!customer) return res.status(404).send("The customer with given id is not found!")
    return res.send(customer)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send("The customer with given id is not found!")
    return res.send(customer)
})

module.exports = router