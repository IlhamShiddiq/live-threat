const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({
            status: 403,
            message: 'A token is required for authentication',
        });
    }

    try {
        req.user = jwt.verify(token.split(' ')[1], authConfig.secret);
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid token or token already expired',
        });
    }

    return next();
}

module.exports = {
    verifyToken,
}