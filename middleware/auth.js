import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).json({message: "Token required"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: "Unauthorized access"});
        req.user = user;
        next();
    });
};

export default authenticateToken;
