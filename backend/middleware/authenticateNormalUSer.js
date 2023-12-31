// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const secret = require('../secrets/jwtSecret')
function authenticateNormalUSer(req, res, next) {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secret); // Replace 'your_jwt_secret' with your secret key
        req.user = decoded.username;
        next();

    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = authenticateNormalUSer;
