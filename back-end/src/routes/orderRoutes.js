const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/add-order', orderController.addOrder);
router.get('/get-orders/:idUser', orderController.getOrdersByUser);

module.exports = router;