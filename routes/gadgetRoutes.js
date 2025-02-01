import express from 'express';
import Gadget from '../models/Gadget.js';
import authenticateToken from '../middleware/auth.js'; 

const router = express.Router();
const gadgets = [];

// Function to generate a unique codename
const generateCodename = () => {
    const codenames = ["The Nightingale", "The Kraken", "The Phantom", "The Shadow", "The Falcon"];
    return codenames[Math.floor(Math.random() * codenames.length)];
};

// GET /gadgets
router.get('/', authenticateToken, (req, res) => {
    const gadgetsWithProbability = gadgets.map(gadget => ({
        ...gadget,
        missionSuccessProbability: Math.floor(Math.random() * 100) + 1 // Random percentage
    }));
    res.json(gadgetsWithProbability);
});

// POST /gadgets
router.post('/', authenticateToken, (req, res) => {
    const { name } = req.body;
    const newGadget = new Gadget(name);
    newGadget.codename = generateCodename(); // Assign a unique codename
    gadgets.push(newGadget);
    res.status(201).json(newGadget);
});

// PATCH /gadgets/:id
router.patch('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const gadget = gadgets.find(g => g.id === id);
    if (gadget) {
        gadget.name = name || gadget.name;
        gadget.status = status || gadget.status;
        res.json(gadget);
    } else {
        res.status(404).json({ message: 'Gadget not found' });
    }
});

// DELETE /gadgets/:id
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const gadget = gadgets.find(g => g.id === id);
    if (gadget) {
        gadget.status = 'Decommissioned';
        gadget.decommissionedAt = new Date(); // Add timestamp for decommissioning
        res.json(gadget);
    } else {
        res.status(404).json({ message: 'Gadget not found' });
    }
});

// POST /gadgets/:id/self-destruct
router.post('/:id/self-destruct', authenticateToken, (req, res) => {
    const { id } = req.params;
    const confirmationCode = Math.floor(1000 + Math.random() * 9000); // Simulated confirmation code
    const gadget = gadgets.find(g => g.id === id);
    if (gadget) {
        res.json({ message: 'Self-destruct sequence initiated', confirmationCode });
    } else {
        res.status(404).json({ message: 'Gadget not found' });
    }
});

export default router;
