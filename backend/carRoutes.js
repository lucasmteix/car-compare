const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const carsPath = path.join(__dirname, '../data/cars.json');
let cars = JSON.parse(fs.readFileSync(carsPath, 'utf8'));


// GET /api/cars - listar todos os carros
router.get('/', (req, res) => {
  fs.readFile('cars.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler cars.json' });
    res.json(JSON.parse(data));
  });
});

// GET /api/cars/:id - buscar um carro por ID
router.get('/:id', (req, res) => {
  fs.readFile('cars.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Erro ao ler cars.json' });

    const cars = JSON.parse(data);
    const car = cars.find(c => c.id === parseInt(req.params.id));

    if (!car) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(car);
  });
});

module.exports = router;
