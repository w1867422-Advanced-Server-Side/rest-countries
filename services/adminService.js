const userDao    = require('../dao/userDao');
const apiKeyDao  = require('../dao/apiKeyDao');

async function getAllUsers() {
    return await userDao.getAllUsers();
}

async function updateUserRole(userId, newRole) {
    const user = await userDao.findUserById(userId);
    if (!user) throw new Error('User not found');
    return await userDao.updateUserRole(userId, newRole);
}

async function deleteUser(userId) {
    await userDao.deleteUser(userId);
    return { id: userId };
}

async function getAllApiKeys() {
    return await apiKeyDao.getAllApiKeys();
}

async function updateApiKeyByAdmin(keyId, updates) {
    const key = await apiKeyDao.getApiKeyById(keyId);
    if (!key) throw new Error('API key not found');
    return await apiKeyDao.updateApiKey(keyId, updates);
}

async function deleteApiKeyByAdmin(keyId) {
    await apiKeyDao.deleteApiKey(keyId);
    return { id: keyId };
}

module.exports = {
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllApiKeys,
    updateApiKeyByAdmin,
    deleteApiKeyByAdmin
};
