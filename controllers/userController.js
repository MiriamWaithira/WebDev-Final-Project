const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


exports.register = async (req, res) => {
    const { username, email, password, isSeller } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({ username, email, password: hashedPassword, isSeller });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: { email } });
        if (!User) return res.status(404).json({ eror: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, isSeller: user.isSeller }, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};