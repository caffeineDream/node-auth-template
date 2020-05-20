const express = require('express');
const router = express.Router();
const path = require('path');

/* GET auth page. */
router.get('/', function(req, res) {
    res.render('lobby');
    // res.sendFile(path.join(__dirname, '/../public/lobby/lobby.html'));
});

module.exports = router;