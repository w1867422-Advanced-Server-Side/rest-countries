const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const apiKeyController = require('../controllers/apiKeyController');

router.post   ('/',      authenticateJWT, apiKeyController.generateApiKey);
router.get    ('/',      authenticateJWT, apiKeyController.getMyApiKeys);
router.put    ('/:id',   authenticateJWT, apiKeyController.updateMyApiKey);
router.delete ('/:id',   authenticateJWT, apiKeyController.deleteMyApiKey);

module.exports = router;
