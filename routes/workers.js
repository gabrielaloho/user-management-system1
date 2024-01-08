const express = require('express');
const Worker = require('../models/workerModel');
const cors = require('cors');

const router = express.Router();
router.use(cors());

// Create new worker entry
router.post('/', async (req, res) => {
  try {
    const { GebrachtVonLvl1 } = req.body;
    const parentWorker = await Worker.findById(GebrachtVonLvl1);

    // Calculate Lvl 2 and Lvl 3 based on the hierarchy
    req.body.Lvl2 = parentWorker ? parentWorker.Lvl2 || parentWorker._id : null;
    req.body.Lvl3 = parentWorker ? parentWorker.Lvl3 || parentWorker._id : null;

    const newWorker = await Worker.create(req.body);
    res.status(201).json(newWorker);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ error: 'Validation Error', errors });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Edit existing worker entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedWorker);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
