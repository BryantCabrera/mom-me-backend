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
        })
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Create Route
router.post('/', async (req, res) => {
    console.log(req.body, 'hitting create Mom');

    let hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
    try {
        const createdMom = await Mom.create(req.body);
        res.json({
            status: 200,
            data: 'Registration successful.',
            createdMom: createdMom
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;