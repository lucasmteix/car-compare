
const pool = require('../backend/src/config/db'); // caminho relativo até db.js

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Conexão funcionando! Resultado do teste:', rows[0].result);
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  } finally {
    await pool.end(); // fecha o pool
  }
}

testConnection();
