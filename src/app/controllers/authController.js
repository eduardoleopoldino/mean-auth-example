const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authConfig = require('../../config/auth.json');

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Email already exists' });

        const user = await User.create(req.body);
        const token = generateToken({ id: user.id });

        user.password = undefined;

        return res.send({ user, token });
    } catch (error) {
        return res.status(400).send({ error: 'Registration error' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'Invalid user' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid user' });

    user.password = undefined;

    const token = generateToken({ id: user.id });

    res.send({ user, token });
});

module.exports = app => app.use('/api/auth', router);