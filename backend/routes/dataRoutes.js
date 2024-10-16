// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { getAllData, getFilteredData } = require('../controllers/data');

// Route to get all data
router.get('/data', getAllData);

// Route to get filtered data based on query parameters (e.g., end_year, topic, etc.)
router.get('/data/filter', getFilteredData);

module.exports = router;
