/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Caretaker = require('../models/caretaker');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allCaretakers = await Caretaker.find({});

        res.json({
            status: 200,
            data: allCaretakers
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Create Route
router.post('/', async (req, res) => {
    console.log(req.body, 'hitting create Caretaker');

    let hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
    try {
        const createdCaretaker = await Caretaker.create(req.body);
        res.json({
            status: 200,
            data: 'Registration successful.',
            createdCaretaker: createdCaretaker
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Show Route
router.get('/:id', async (req, res) => {
    try {
        const foundCaretaker = await Caretaker.findById(req.params.id);
        res.json({
            status: 200,
            data: foundCaretaker
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Update Route
router.put('/:id', async (req, res) => {
    try {
        const updatedCaretaker = await Caretaker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: 200,
            data: updatedCaretaker
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;