const express = require('express');
const router = express.Router();

// Importa o controller que contém a lógica de cada ação (listar, criar, etc.)
const CarController = require('../controllers/carController');

// Middleware que valida os dados antes de criar/editar um carro
const validateCar = require('../middleware/validateCar');

// ---------------- ROTAS ----------------

// GET /cars/  → Lista todos os carros
router.get('/', CarController.getAll);

// GET /cars/brands  → Retorna a lista de marcas disponíveis
router.get('/brands', CarController.getBrands);

// GET /cars/compare/:id1/:id2  → Compara dois carros pelo ID
router.get('/compare/:id1/:id2', CarController.compare);

// GET /cars/:id  → Busca um carro específico pelo ID
router.get('/:id', CarController.getById);

// POST /cars/  → Cria um novo carro (com validação dos dados)
router.post('/', validateCar, CarController.create);

// PUT /cars/:id  → Atualiza um carro existente (com validação)
router.put('/:id', validateCar, CarController.update);

// DELETE /cars/:id  → Remove um carro do banco
router.delete('/:id', CarController.delete);

// Exporta o router para ser usado no server.js
module.exports = router;
