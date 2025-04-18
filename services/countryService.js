const axios = require('axios');

function extractCountryData(country) {
    return {
        name:       country.name?.common || null,
        capital:    Array.isArray(country.capital) ? country.capital[0] : null,
        currencies: country.currencies   || {},
        languages:  country.languages    || {},
        flag:       country.flags?.png   || country.flags?.svg || null
    };
}

/**
 * Fetch all countries.
 */
async function getAllCountries() {
    const res = await axios.get('https://restcountries.com/v3.1/all');
    if (res.status !== 200) {
        throw new Error(`REST Countries API returned ${res.status}`);
    }
    return res.data.map(extractCountryData);
}

/**
 * Fetch countries matching a name.
 */
async function getCountryByName(name) {
    const res = await axios.get(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
    );
    if (res.status !== 200) {
        throw new Error(`REST Countries API returned ${res.status}`);
    }
    return res.data.map(extractCountryData);
}

module.exports = {
    getAllCountries,
    getCountryByName
};
