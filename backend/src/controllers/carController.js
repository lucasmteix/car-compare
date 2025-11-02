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
  },

  // DELETE /api/cars/:id
  async delete(req, res) {
    try {
      const [result] = await db.query('DELETE FROM cars WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ error: "Carro não encontrado" });
      res.json({ message: "Carro removido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/cars/compare/:id1/:id2
  async compare(req, res) {
    const { id1, id2 } = req.params;
    try {
      const [[rows1], [rows2]] = await Promise.all([
        db.query('SELECT * FROM cars WHERE id = ?', [id1]),
        db.query('SELECT * FROM cars WHERE id = ?', [id2])
      ]);

      const car1 = rows1[0];
      const car2 = rows2[0];

      if (!car1 || !car2) {
        return res.status(404).json({ error: "Um dos carros não foi encontrado" });
      }

      const result = {
        modelos: `${car1.model} vs ${car2.model}`,
        potencia: `${car1.power_hp} cv / ${car2.power_hp} cv`,
        torque: `${car1.torque_nm} Nm / ${car2.torque_nm} Nm`,
        categoria: `${car1.category} / ${car2.category}`
      };

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /api/cars/brands
  async getBrands(req, res) {
    try {
      const [rows] = await db.query('SELECT DISTINCT brand FROM cars ORDER BY brand');
      const brands = rows.map(r => r.brand);
      res.json(brands);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = CarController;