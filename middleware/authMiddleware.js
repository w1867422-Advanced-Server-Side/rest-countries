require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Authorization token required' });
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = payload; // Attach decoded user info to request
        next();
    });
}

module.exports = { authenticateJWT };
