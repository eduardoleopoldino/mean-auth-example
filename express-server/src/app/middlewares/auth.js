const jwt = require('jsonwebtoken');
const config = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Authentication required!' });

    const [bearer, token] = authHeader.split(' ');

    if (!bearer || !token)
        return res.status(401).send({ error: 'Authentication required!!' });

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ error: 'Authentication failed!' });
        }

        req.userId = decoded.id;

        return next();
    });
};