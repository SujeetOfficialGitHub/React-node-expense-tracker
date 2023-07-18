const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expenseController');
router.post('/add-expense', expenseController.addExpense)
router.get('/get-expenses', expenseController.getExpenses)
router.delete('/delete-expense/:expenseId', expenseController.deleteExpense)
router.put('/update-expense/:expenseId', expenseController.updateExpense)

module.exports = router;