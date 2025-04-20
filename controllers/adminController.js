const adminService = require('../services/adminService');
const { catchAsync } = require('../utils/errorHandler');

const getAllUsers = catchAsync(async (req, res) => {
    const users = await adminService.getAllUsers();
    res.json(users);
});

const updateUserRole = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const updated = await adminService.updateUserRole(id, role);
    res.json(updated);
});

const deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.deleteUser(id);
    res.json(result);
});

const getAllApiKeys = catchAsync(async (req, res) => {
    const keys = await adminService.getAllApiKeys();
    res.json(keys);
});

const updateApiKey = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const updated = await adminService.updateApiKeyByAdmin(id, updates);
    res.json(updated);
});

const deleteApiKey = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.deleteApiKeyByAdmin(id);
    res.json(result);
});

module.exports = {
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllApiKeys,
    updateApiKey,
    deleteApiKey
};
