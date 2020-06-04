const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../model/User');
const { inputValidation } = require('../../utils/validation');

/* Middleware */
router.use(express.json());

/* Register new user */
router.post('/register', async (req, res) => {

    /* Validate register data input */
    const {error} = inputValidation(req.body);
    if (error) return res.status(401).render('auth', { data: { error: error.details[0].message } });

    /* Check if username is unique */
    const usernameExists = await User.findOne({ username: req.body.username});
    if (usernameExists) return res.status(401).render('auth', { data: { error: 'Username is taken :(' } });

    /* Hash the password and create new User */
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        group: 'user'
    });

    /* Save new User to the database */
    try {
        await user.save();
        console.log(`Register: created — ${user}`)
        res.status(200).render('auth', { data: { feedback: 'Registration successful.' } });
    } catch (err) {
        res.status(401).render('auth', { data: { error: 'Something went wrong, try again.' } });
    }
});

module.exports = router;