const crypto = require('crypto');
const apiKeyDao = require('../dao/apiKeyDao');

function generateRandomApiKey() {
    return crypto.randomBytes(16).toString('hex');
}

async function generateApiKeyForUser(user_id) {
    const api_key = generateRandomApiKey();
    return await apiKeyDao.createApiKey({ user_id, api_key });
}

async function getUserApiKeys(user_id) {
    return await apiKeyDao.getApiKeysByUserId(user_id);
}

async function updateUserApiKey(user_id, keyId, updates) {
    const key = await apiKeyDao.getApiKeyById(keyId);
    if (!key) throw new Error('API key not found');
    if (key.user_id !== user_id) throw new Error('Access denied: Not your API key');
    return await apiKeyDao.updateApiKey(keyId, updates);
}

async function deleteUserApiKey(user_id, keyId) {
    const key = await apiKeyDao.getApiKeyById(keyId);
    if (!key) throw new Error('API key not found');
    if (key.user_id !== user_id) throw new Error('Access denied: Not your API key');
    return await apiKeyDao.deleteApiKey(keyId);
}

module.exports = {
    generateRandomApiKey,
    generateApiKeyForUser,
    getUserApiKeys,
    updateUserApiKey,
    deleteUserApiKey
};