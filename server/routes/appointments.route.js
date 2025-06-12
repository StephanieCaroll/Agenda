const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { Op } = require('sequelize');

// GET com filtro por data
router.get('/', async (req, res) => {
  const { date } = req.query; //Filtro incluido
  const where = date ? { date } : {};
  const appointments = await Appointment.findAll({ where });
  res.json(appointments);
});

// POST
router.post('/', async (req, res) => {
  const newApp = await Appointment.create(req.body);
  res.json(newApp);
});

// PUT
router.put('/:id', async (req, res) => { 
  const { id } = req.params;
  const updated = await Appointment.update(req.body, { where: { id } });
  res.json({ updated });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Appointment.destroy({ where: { id } });
  res.json({ deleted: true });
});

module.exports = router;