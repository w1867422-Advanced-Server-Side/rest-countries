const userDao    = require('../dao/userDao');

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

module.exports = {
    getAllUsers,
    updateUserRole,
    deleteUser
};
