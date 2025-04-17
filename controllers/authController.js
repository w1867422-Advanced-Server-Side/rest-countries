const authService = require('../services/authService');
const { catchAsync } = require('../utils/errorHandler');

const register = catchAsync(async (req, res) => {
    const { username, email, password } = req.body;
    const result = await authService.register({ username, email, password });
    res.status(201).json(result);
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
});

const getProfile = catchAsync(async (req, res) => {
    const user = await authService.getProfile(req.user.id);
    res.json(user);
});

module.exports = {
    register,
    login,
    getProfile
};
