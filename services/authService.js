const bcrypt = require('bcrypt');
const authDAO = require('../dao/authDAO');

/**
 * Registers a user, hashing the password.
 */
async function registerUser(username, email, password) {
    const existing = await authDAO.findByUsername(username);
    if (existing) {
        throw new Error('Username already taken');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    return await authDAO.createUser({username, passwordHash, email});
}

/**
 * Validates credentials. If correct, return user record; else null.
 */
async function validateUserCredentials(username, password) {
    const user = await authDAO.findByUsername(username);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;
    return user;
}

module.exports = {
    registerUser,
    validateUserCredentials
};
