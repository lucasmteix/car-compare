const express = require('express');
const pool = require('../config/db'); // ajuste o caminho se necessário
const router = express.Router();

router.get('/teste-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.json({ success: true, resultado: rows[0].result });
  } catch (err) {
    res.status(500).json({ success: false, erro: err.message });
  }
});

module.exports = router;
