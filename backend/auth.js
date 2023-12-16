const jwt = require('jsonwebtoken');


function generateToken(user) {
    
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = { generateToken, verifyToken };
