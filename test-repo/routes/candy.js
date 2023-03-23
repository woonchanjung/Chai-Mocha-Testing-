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

// DELETE /candies/:id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = candies.findIndex(candy => candy.id == id);
  if (index !== -1) {
  candies.splice(index, 1);
  res.status(204).json({ message: 'Candy deleted successfully.' });
  } else {
  res.status(404).json({ message: `Candy with ID ${id} not found.` });
  }
});

module.exports = router;