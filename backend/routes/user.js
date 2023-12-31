// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secrets/jwtSecret')
const authenticateNormalUSer = require('../middleware/authenticateNormalUSer')
const { getDB } = require('../mongodb'); // Replace with your user model


// Admin User Signup
router.post('/admin/signup', async (req, res) => {
    try {
        const { username, email, password, name, contactNumber } = req.body;
        const db = getDB();
        const adminUsers = db.collection('adminusers')

        // Check if the username already exists
        const existingAdmin = await adminUsers.findOne({ username });
        if (existingAdmin) {
            return res.status(200).send('Username already exists.');
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user with hashed password
        await adminUsers.insertOne({ username, email, password: hashedPassword, name, contactNumber });

        res.status(201).json({ message: 'Admin user created successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Normal User Signup
router.post('/normal/signup', async (req, res) => {
    try {
        const { username, name, email, contactNumber } = req.body;
        const db = getDB();
        const normalUsers = db.collection('normalusers')

        // Check if the username already exists
        const existingNormalUser = await normalUsers.findOne({ username });
        if (existingNormalUser) {
            return res.status(200).send('Username already exists.');
        }

        // Create a new normal user
        await normalUsers.insertOne({ username, name, email, contactNumber });

        res.status(201).json({ message: 'Normal user created successfully.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    const adminUsers = db.collection('adminusers')
    if (username && password) {
        const user = await adminUsers.findOne({ username });

        if (!user) return res.status(400).send({ message: 'Invalid username or password.' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid username or password.' });

        const token = jwt.sign({ isAdmin: true, username: username }, secret); // Replace secret with your secret key
        res.header('Authorization', token).json({ token, username });
    }
    else {
        res.status(400).json({ message: 'username or password is not provided' });
    }

});
router.post('/normal/Login', async (req, res) => {
    const { username } = req.body;
    const db = getDB();
    const normalUsers = db.collection('normalusers')
    const user = await normalUsers.findOne({ username });

    if (!user) return res.status(400).json({
        message: 'Invalid username'
    });
    const token = jwt.sign({ isAdmin: false, username }, secret); // Replace secret with your secret key
    res.header('Authorization', token).json({ token, username });
});


router.patch('/admin/changePassword', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    const adminUsers = db.collection('adminusers')
    const user = await adminUsers.findOne({ username });

    if (!user) return res.status(400).json({
        message: 'Invalid username'
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    await adminUsers.updateOne(
        { username }, // Search criteria
        { $set: { password: hashedPassword } }, // Update fields
    )
    return res.status(200).json({
        message: 'password changed'
    });

});
router.get('/getUsers', authenticateNormalUSer, async (req, res) => {
    try {
        const db = getDB();
        const filter = { username: req.user }
        const normalUsers = db.collection('normalusers')
        const user = await normalUsers.findOne(filter)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
