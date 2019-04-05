/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Mom = require('../models/mom');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
//Index Route
router.get('/', async (req, res) => {
    try {
        const allMoms = await Mom.find({});

        res.json({
            status: 200,
            data: allMoms
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Create Route
router.post('/', async (req, res) => {
    let hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;

    console.log(req.body, 'hitting create Mom');
    try {
        const createdMom = await Mom.create(req.body);
        res.json({
            status: 200,
            message: 'Registration successful.',
            data: createdMom
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Show Route
router.get('/:id', async (req, res) => {
    try {
        const foundMom = await Mom.findById(req.params.id);
        res.json({
            status: 200,
            data: foundMom
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Update Route
router.put('/:id', async (req, res) => {
    try {
        console.log(req.body, 'hitting edit route on back end')
        const updatedMom = await Mom.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log(updatedMom,'updated mom from back end')
        res.json({
            status: 200,
            data: updatedMom
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

// Delete Route
router.delete('/:id', async (req, res) => {
    try {
        const deletedMom = await Mom.findByIdAndRemove(req.params.id);

        console.log(deletedMom, ' this is deletedMom');
        res.json({
            status: 200,
            message: 'Mom successfully deleted.'
        });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;