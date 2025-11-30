const express = require('express');
const pool = require('../config/db'); // Conexão com o banco MySQL
const router = express.Router();

// GET /teste-db  → Verifica se a conexão com o banco está funcionando
router.get('/teste-db', async (req, res) => {
  try {
    // Executa um SELECT simples para testar o banco
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    
    // Retorna o resultado do teste
    res.json({ success: true, resultado: rows[0].result });

  } catch (err) {
    // Caso algo dê errado (erro de conexão, SQL, etc.)
    res.status(500).json({ success: false, erro: err.message });
  }
});

// Exporta o router
module.exports = router;
