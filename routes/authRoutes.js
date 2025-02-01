import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock user for demonstration purposes
const mockUser = {
    username: 'admin',
    password: 'password' 
};

// POST /login
router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Check if the credentials are valid
    if (username === mockUser.username && password === mockUser.password) {
        // Generate a JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

export default router;
