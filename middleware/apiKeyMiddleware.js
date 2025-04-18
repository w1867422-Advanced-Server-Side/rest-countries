const { findApiKeyByValue } = require('../dao/apiKeyDao');

/**
 * Middleware to authenticate requests bearing an API key.
 * Expects the key in the `x-api-key` header.
 * Attaches the full key record on `req.apiKey` if valid.
 */
async function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ message: 'API key required' });
    }

    try {
        const keyRecord = await findApiKeyByValue(apiKey);
        if (!keyRecord) {
            return res.status(403).json({ message: 'Invalid or inactive API key' });
        }
        req.apiKey = keyRecord;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = { authenticateApiKey };