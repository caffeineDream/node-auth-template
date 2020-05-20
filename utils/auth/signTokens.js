const jwt = require('jsonwebtoken');

function signToken(payload) { 
    // Sign short-lived access token
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: 3});

    // Sign long-lived refresh token
    const refreshToken =  jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d'});

    return { accessToken: accessToken, refreshToken: refreshToken };
};

module.exports = signToken;