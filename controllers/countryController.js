const countryService = require('../services/countryService');
const apiKeyService  = require('../services/apiKeyService');
const { catchAsync } = require('../utils/errorHandler');

const getAllCountries = catchAsync(async (req, res) => {
    const countries = await countryService.getAllCountries();
    await apiKeyService.logApiKeyUsage(req.apiKey.id);
    res.json(countries);
});

const getCountryByName = catchAsync(async (req, res) => {
    const countries = await countryService.getCountryByName(req.params.name);
    await apiKeyService.logApiKeyUsage(req.apiKey.id);
    res.json(countries);
});

module.exports = {
    getAllCountries,
    getCountryByName
};
