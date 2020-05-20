const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../../model/User');
const signTokens = require('../../utils/auth/signTokens');
const { inputValidation } = require('../../utils/validation');

/* Middleware */
router.use(express.json());

/* Authenticate user by form data */
router.post('/auth', async (req, res) => {

    /* Validate register data input */  
    const {error} = inputValidation(req.body);
    if (error) return res.status(401).render('auth', { data: { error: error.details[0].message } });

    /* Check if username exists */
    const user = await User.findOne({ username: req.body.username});
    if (!user) return res.status(401).render('auth', { data: { error: 'Username is not found :(' } });

    /* Check if password is correct */
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch)  return res.status(401).render('auth', { data: { error: 'Username and password do not match' } });
    /* Create token with payload */
    const payload = { id: user._id, username: user.username, type: user.type};
    const {accessToken, refreshToken} = signTokens(payload);

    /* Assign token and send lobby page */
    res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken).redirect(303, '/');
});

module.exports = router;