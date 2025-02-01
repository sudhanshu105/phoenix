import express from 'express';
import pkg from 'pg';
import fs from 'fs';
const { Client } = pkg;
import authenticateToken from '../middleware/auth.js'; 
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync('../ca.pem').toString(),
    },
});

// Connect to the database
client.connect(err => {
    if (err) {
        console.error('Connection error:', err);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// Function to generate a unique codename
const generateCodename = () => {
    const codenames = ["The Nightingale", "The Kraken", "The Phantom", "The Shadow", "The Falcon"];
    return codenames[Math.floor(Math.random() * codenames.length)];
};

// GET /gadgets
router.get('/', authenticateToken,async (req, res) => {
    const { status } = req.query; // Get status from query parameters
    let query = 'SELECT * FROM gadgets';
    const params = [];

    if (status) {
        query += ' WHERE status = $1';
        params.push(status);
    }

    try {
        const result = await client.query(query, params);
        const gadgetsWithProbability = result.rows.map(gadget => ({
            ...gadget,
            missionSuccessProbability: Math.floor(Math.random() * 100) + 1 // Random percentage
        }));
        res.json(gadgetsWithProbability);
    } catch (error) {
        console.error('Error fetching gadgets:', error);
        res.status(500).json({ message: 'Error fetching gadgets' });
    }
});

// POST /gadgets
router.post('/', authenticateToken,async (req, res) => {
    const { name } = req.body;
    const codename = generateCodename(); // Assign a unique codename
    const query = 'INSERT INTO gadgets (name, codename, status) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, codename, 'Available'];

    try {
        const result = await client.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding gadget:', error);
        res.status(500).json({ message: 'Error adding gadget' });
    }
});

// PATCH /gadgets/:id
router.patch('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const query = 'UPDATE gadgets SET name = $1, status = $2 WHERE id = $3 RETURNING *';
    const values = [name || null, status || null, id];

    try {
        const result = await client.query(query, values);
        if (result.rowCount > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Gadget not found' });
        }
    } catch (error) {
        console.error('Error updating gadget:', error);
        res.status(500).json({ message: 'Error updating gadget' });
    }
});

// DELETE /gadgets/:id
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE gadgets SET status = $1, decommissioned_at = $2 WHERE id = $3 RETURNING *';
    const values = ['Decommissioned', new Date(), id];

    try {
        const result = await client.query(query, values);
        if (result.rowCount > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Gadget not found' });
        }
    } catch (error) {
        console.error('Error decommissioning gadget:', error);
        res.status(500).json({ message: 'Error decommissioning gadget' });
    }
});

// POST /gadgets/:id/self-destruct
router.post('/:id/self-destruct',authenticateToken, async (req, res) => {
    const { id } = req.params;
    const confirmationCode = Math.floor(1000 + Math.random() * 9000); // Simulated confirmation code
    const query = 'SELECT * FROM gadgets WHERE id = $1';
    
    try {
        const result = await client.query(query, [id]);
        if (result.rowCount > 0) {
            res.json({ message: 'Self-destruct sequence initiated', confirmationCode });
        } else {
            res.status(404).json({ message: 'Gadget not found' });
        }
    } catch (error) {
        console.error('Error fetching gadget for self-destruct:', error);
        res.status(500).json({ message: 'Error fetching gadget for self-destruct' });
    }
});

export default router;
