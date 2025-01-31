const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Gadget = require('../models/Gadget');

const router = express.Router();

// GET /gadgets - Retrieve a list of all gadgets
router.get('/', async (req, res) => {
  try {
    const gadgets = await Gadget.findAll();
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.toJSON(),
      missionSuccessProbability: Math.floor(Math.random() * 100) + 1,
    }));
    res.json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve gadgets' });
  }
});

// POST /gadgets - Add a new gadget to the inventory
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newGadget = await Gadget.create({ name });
  res.status(201).json(newGadget);
});

// PATCH /gadgets/:id - Update an existing gadget's information
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    gadget.name = name || gadget.name;
    gadget.status = status || gadget.status;
    await gadget.save();
    res.json(gadget);
  } else {
    res.status(404).json({ error: 'Gadget not found' });
  }
});

// DELETE /gadgets/:id - Mark a gadget as decommissioned
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();
    await gadget.save();
    res.json(gadget);
  } else {
    res.status(404).json({ error: 'Gadget not found' });
  }
});

module.exports = router;
