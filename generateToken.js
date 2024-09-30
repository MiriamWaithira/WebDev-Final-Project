const jwt = require('jsonwebtoken');

// Define the payload (customize this according to your needs)
const payload = {
    id: '123', // Example user ID
    email: 'user@example.com' // Example user email
};

// Define a secret key (you should keep this secure)
const secretKey = 'your-secret-key'; // Change this to your actual secret key

// Generate the token
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// Output the generated token
console.log('Generated JWT:', token);
