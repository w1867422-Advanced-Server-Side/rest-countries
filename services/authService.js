const bcrypt = require('bcryptjs');
const userDao = require('../dao/userDao');
const { signToken } = require('../utils/jwtHelper');

async function register({ username, email, password }) {
    const existingUser = await userDao.findUserByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const count = await userDao.getUserCount();
    const role = count === 0 ? 'admin' : 'user';

    const newUser = { username, email, password: hashedPassword, role };
    const createdUser = await userDao.createUser(newUser);
    const token = signToken({ id: createdUser.id, email: createdUser.email, role: createdUser.role });
    return { token, user: createdUser };
}

async function login({ email, password }) {
    const user = await userDao.findUserByEmail(email);
    if (!user) throw new Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
}

async function getProfile(userId) {
    const user = await userDao.findUserById(userId);
    if (!user) throw new Error('User not found');
    return user;
}

module.exports = {
    register,
    login,
    getProfile
};
