const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Get all stocks with basic info
router.get('/', stockController.getAllStocks);

// Get current price for a specific stock
router.get('/:id/price', stockController.getStockPrice);

// Get detailed historical data for a specific stock
router.get('/:id', stockController.getStockDetails);

module.exports = router;
