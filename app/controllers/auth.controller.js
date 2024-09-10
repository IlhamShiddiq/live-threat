const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const generateJwt = (req, res) => {
    const jwtToken = jwt.sign({}, authConfig.secret);
    res.json({
        status: 200,
        success: true,
        message: 'Jwt generated successfully',
        data: {
            token: jwtToken
        }
    });
}

module.exports = {
    generateJwt,
}
