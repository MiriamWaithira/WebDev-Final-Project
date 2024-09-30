const { Listing } = require('../models');


exports.addListing = async (req, res) => {
    const { userId, category, type, name, description, cost, quantity, location, contacts, workingHours } = req.body;
    try {
        const listing = await Listing.create({ userId, category, type, name, description, cost, quantity, location, contacts, workingHours });
        res.status(201).json(listing);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add listing' });
    }
};

exports.getAllListings = async (req,res) => {
    try {
        const listings = await Listing.findAll();
        res.json(listings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve listings' });
    }
};