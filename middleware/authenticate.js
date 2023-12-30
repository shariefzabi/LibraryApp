// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const secret = require('../secrets/jwtSecret')
function authenticateAdmin(req, res, next) {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secret); // Replace 'your_jwt_secret' with your secret key
        if (decoded.isAdmin) {
            req.user = decoded;
            next();
        } else {
            return res.status(403).json({ message: 'Access denied. Not an admin user.' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports = authenticateAdmin;
