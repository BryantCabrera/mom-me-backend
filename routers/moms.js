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

module.exports = router;