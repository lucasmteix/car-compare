const db = require('../config/db');

const CarController = {
  // GET /api/cars
  async getAll(req, res) {
    try {
      const [rows] = await db.query('SELECT * FROM cars ORDER BY brand, model');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/cars/:id
  async getById(req, res) {
    try {å
      const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ error: "Carro não encontrado" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = CarController;