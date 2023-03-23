const express = require('express');
const router = express.Router();

const candies = require('../models/candy');

//GET  /candies
router.get('/', (req ,res) => {
    res.json(candies);
});

//POST /candies
router.post('/', (req, res) => {
  candies.push(req.body);
  // sends back a response status that the resource has been created
  // and the candy in json format 
  res.status(201).json(req.body)
});

module.exports = router;