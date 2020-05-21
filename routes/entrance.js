const express = require('express');
const router = express.Router();

/* GET auth page. */
router.get('/', function(req, res) {
    res.render('lobby');
});

module.exports = router;