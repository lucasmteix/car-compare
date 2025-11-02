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
    try {
      const [rows] = await db.query('SELECT * FROM cars WHERE id = ?', [req.params.id]);
      if (rows.length === 0) return res.status(404).json({ error: "Carro não encontrado" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /api/cars
  async create(req, res) {
    const car = req.body;
    try {
      const [result] = await db.query(
        `INSERT INTO cars (model, brand, year, power_hp, torque_nm, weight_kg, traction, top_speed_kmh, category, fuel_type, price, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          car.model, car.brand, car.year, car.power_hp, car.torque_nm,
          car.weight_kg, car.traction, car.top_speed_kmh, car.category,
          car.fuel_type, car.price, car.image_url
        ]
      );
      res.status(201).json({ id: result.insertId, ...car });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /api/cars/:id
  async update(req, res) {
    const { id } = req.params;
    const car = req.body;
    try {
      const [result] = await db.query(
        `UPDATE cars SET model=?, brand=?, year=?, power_hp=?, torque_nm=?, weight_kg=?, traction=?, top_speed_kmh=?, category=?, fuel_type=?, price=?, image_url=? WHERE id=?`,
        [
          car.model, car.brand, car.year, car.power_hp, car.torque_nm,
          car.weight_kg, car.traction, car.top_speed_kmh, car.category,
          car.fuel_type, car.price, car.image_url, id
        ]
      );
      if (result.affectedRows === 0) return res.status(404).json({ error: "Carro não encontrado" });
      res.json({ id: Number(id), ...car });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = CarController;