const express = require('express');
const router = express.Router();
const CarController = require('../controllers/carController');
const validateCar = require('../middleware/validateCar');

router.get('/', CarController.getAll);
router.get('/brands', CarController.getBrands);
router.get('/compare/:id1/:id2', CarController.compare);
router.get('/:id', CarController.getById);

router.post('/', validateCar, CarController.create);
router.put('/:id', validateCar, CarController.update);
router.delete('/:id', CarController.delete);

module.exports = router;
