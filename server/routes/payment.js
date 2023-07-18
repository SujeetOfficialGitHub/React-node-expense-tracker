const express = require('express')
const router = express.Router();

const paymentController = require('../controller/paymentController');
const {authenticateToken} = require('../middleware/authMiddleware')

router.use(authenticateToken);
router.post('/create-order', paymentController.createOrder)
router.post('/payment_success', paymentController.paymentSuccess)




module.exports = router