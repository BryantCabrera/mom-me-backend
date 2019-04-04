/********** REQUIRES **********/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Mom = require('../models/mom');

/********** MIDDLEWARE **********/

/********** ROUTES **********/
// Log-In
router.post('/login', async (req, res) => {
    try {
        //finds logged in user 
        //gets email from req.body (username was attached via form and kept in req.body)
        const loggedMom = await Mom.findOne({ email: req.body.email });
        console.log(loggedMom, ' this is loggedMom');
        //if Mom exists
        if (loggedMom) {
            //checks if the passwords match, if they do, redirect to page, if not, keep on splash page with message
            //compares password from req.body to Mom's hashedpassword in database
            if (bcrypt.compareSync(req.body.password, loggedMom.password) && req.body.email === loggedMom.email) {
                //once Mom is found, create a session
                req.session.user = loggedMom;
                req.session.message = '';
                req.session.logged = true;

                const { _id, name, email, img, children, sex, location, caretakers } = loggedMom
                const responseLoggedMom = {
                    _id: _id,
                    name: name,
                    email: email,
                    img: img, 
                    children: children,
                    sex: sex,
                    location: location,
                    caretakers: caretakers
                }
                // res.json({ loggedMom, isLoggedIn: true });
                res.json({
                    status: 200,
                    message: 'login successful',
                    data: responseLoggedMom
                })
            } else {
                // res.json({ isLoggedIn: false });
                res.json({
                    message: 'The password you entered is incorrect!'
                })
            }
        } else {
            res.json({
                status: 200,
                message: 'That Mom doesn\'t exist!'
            });
        }
    } catch (err) {
        res.json({
            status: 200,
            message: 'Couldn\'t connect to database.'
        });
    }
});

// Log-Out
router.get('/logout', (req, res) => {
    console.log('Mom successfully logged out.');
    // req.session.destroy((err) => err ? res.json({error: err}) : res.json({data: 'Mom successfully logged out.'}));

    req.session.destroy((err) => {
        if (err) return console.log('error', err);
        console.log('successful');
        res.json({ message: 'Mom successfully logged out.' })
    });
});

module.exports = router;