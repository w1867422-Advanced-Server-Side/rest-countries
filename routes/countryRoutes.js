const express = require('express');
const router = express.Router();
const { authenticateApiKey } = require('../middleware/apiKeyMiddleware');
const countryController      = require('../controllers/countryController');

// All country endpoints require a valid API key in x-api-key
router.get('/',      authenticateApiKey, countryController.getAllCountries);
router.get('/:name', authenticateApiKey, countryController.getCountryByName);

module.exports = router;