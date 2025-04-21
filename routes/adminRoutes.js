const express = require('express');
const router  = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateJWT } = require('../middleware/authMiddleware');

function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
}

router.use(authenticateJWT, authorizeAdmin);

router.get   ('/users',       adminController.getAllUsers);
router.put   ('/users/:id',   adminController.updateUserRole);
router.delete('/users/:id',   adminController.deleteUser);

module.exports = router;
