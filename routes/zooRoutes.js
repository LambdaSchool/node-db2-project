// NODE MODULES
// ==============================================
const express = require('express');
const knex = require('knex');

// DATABASE CONFIGURATIONS, EXPRESS ROUTER
// ==============================================
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos);
  } catch {
    res.status(500).json({ error: 'There was an error retrieving all Zoos!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const zoo = await db('zoos').where({ id: req.params.id });
    zoo
      ? res.status(200).json(zoo)
      : res.status(404).json({ error: 'The zoo with the specified ID does not exist.' });
  } catch {
    res.status(500).json({ error: "There was an error retrieving the Zoo's information!" });
  }
});

module.exports = router;
