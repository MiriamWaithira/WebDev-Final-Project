// userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Adjust this import based on your project structure

const router = express.Router(); // Create a new router

// Registration Route for Buyer
router.post('/register-buyer', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check for existing user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword, isSeller: false });

        // Respond to the client
        res.status(201).json({ message: 'User registered successfully!', redirect: '/Buyerlogin' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering. Please try again.' });
    }
});

// Registration Route for Seller
router.post('/register-seller', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check for existing user
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword, isSeller: true });

        // Respond to the client
        res.status(201).json({ message: 'User registered successfully!', redirect: '/Sellerlogin' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering. Please try again.' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Use email instead of username

    console.log(`Attempting to log in user: ${email}`); // Log for debugging
    
    try {
        // Check if the email and password are being passed correctly
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });

        // Check if user exists and if the password matches
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id; // Store user ID in session
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error); // Log the error
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Export the router
module.exports = router;
