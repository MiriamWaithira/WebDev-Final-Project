const express = require('express');
const { Listing } = require('../models'); // Adjust this based on your project structure
const router = express.Router();
const path = require('path');

// Route to get all listings
router.get('/api/listings', async (req, res) => {
    try {
        const listings = await Listing.findAll(); // Fetch listings from the database
        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching listings' });
    }
});



// Route to get listings by seller ID
router.get('/api/my-listings', async (req, res) => {
    try {
        const userId = req.session.userId; // Get userId from session
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const listings = await Listing.findAll({
            where: { userId }, // Assuming the field is `userId`
        });
        if (listings.length === 0) {
            return res.status(404).json({ message: 'You have not created any listings yet.' });
        }

        res.json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching listings for the seller' });
    }
});

// Route to create a new listing
router.post('/create-listing', async (req, res) => {
    const { category, type, name, description, cost, quantity, contacts, workingHours } = req.body;
    const userId = req.session.userId; // Get userId from session

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const newListing = await Listing.create({
            userId,
            category,
            type,
            name,
            description,
            cost,
            quantity,
            contacts,
            workingHours,
        });
        res.status(201).json({ message: 'Listing created successfully!', listing: newListing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating listing. Please try again.' });
    }
});

// Route to render the add listing page
router.get('/add-listing', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/static/html/addListings.html')); // Adjust path as necessary
});



module.exports = router;
