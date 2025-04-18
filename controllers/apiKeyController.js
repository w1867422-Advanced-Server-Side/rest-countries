// controllers/apiKeyController.js
const apiKeyService = require('../services/apiKeyService');
const { catchAsync } = require('../utils/errorHandler');

const generateApiKey = catchAsync(async (req, res) => {
    const user_id = req.user.id;
    const newKey = await apiKeyService.generateApiKeyForUser(user_id);
    res.status(201).json(newKey);
});

const getMyApiKeys = catchAsync(async (req, res) => {
    const user_id = req.user.id;
    const keys = await apiKeyService.getUserApiKeys(user_id);
    res.json(keys);
});

const updateMyApiKey = catchAsync(async (req, res) => {
    const user_id = req.user.id;
    const keyId = req.params.id;
    const updates = req.body;
    const updatedKey = await apiKeyService.updateUserApiKey(user_id, keyId, updates);
    res.json(updatedKey);
});

const deleteMyApiKey = catchAsync(async (req, res) => {
    const user_id = req.user.id;
    const keyId = req.params.id;
    await apiKeyService.deleteUserApiKey(user_id, keyId);
    res.json({ message: 'API key deleted successfully' });
});

module.exports = {
    generateApiKey,
    getMyApiKeys,
    updateMyApiKey,
    deleteMyApiKey
};