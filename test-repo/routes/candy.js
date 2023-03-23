const express = require('express');
const router = express.Router();

const candies = require('../models/candy');

//GET  /candies
router.get('/', (req ,res) => {
    res.json(candies);
});

module.exports = router;