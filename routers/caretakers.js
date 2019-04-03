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

module.exports = router;