const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const carsPath = path.join(__dirname, '../data/cars.json');

function getCars() {
  return JSON.parse(fs.readFileSync(carsPath, 'utf8'));
}

// GET /api/cars - listar todos os carros
router.get('/', (req, res) => {
  try{
    const cars = getCars();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler cars.json' });
  }
});

// GET /api/cars/:id - buscar um carro por ID
router.get('/:id', (req, res) => {
  try { 
    const cars = getCars();
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler cars.json' });
  }
});

module.exports = router;
