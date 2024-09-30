// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const path = require('path');
const session = require('express-session');
const fs = require('fs');


dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// Use the routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

app.use(userRoutes);  // Correctly set up user routes
app.use(listingRoutes);  // Correctly set up listing routes

// ROUTES FOR THE PAGES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'home.html'));
});
app.get('/Buyerlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'Buyerlogin.html'));
});
app.get('/Sellerlogin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'Sellerlogin.html'));
});
app.get('/register-seller', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'register-seller.html'));
});
app.get('/register-buyer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'register-buyer.html'));
});
app.get('/listingsonSale', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'listingsonSale.html'));
});
app.get('/myDash', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'static', 'html', 'myDash.html'));
});
app.get('/add-listing', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'static', 'html', 'addListings.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error loading add-listing page:', err);
            res.status(err.status).end();
        }
    });
});
app.get('/view-listings', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Unauthorized');
    }

    // Proceed to fetch and display listings if authorized
    const filePath = path.join(__dirname, 'public', 'static', 'html', 'viewListings.html');
    res.sendFile(filePath);
});



const PORT = process.env.PORT || 5500;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Database Connected');
});
