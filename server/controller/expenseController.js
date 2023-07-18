const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    if (!amount || !category || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const expense = await Expense.create({ amount, category, description, userId: user.userId });

    if (expense) {
      return res.status(201).json({ message: "Expense added successfully", expense });
    } else {
      return res.status(500).json({ message: "Failed to add expense" });
    }
  } catch (error) {
    console.log("Error in adding expense", error);
    return res.status(500).json({ message: "Failed to add expense" });
  }
};

exports.getExpenses = async (req, res) => {
  // console.log(req.user.userId)
  try {
    const expenses = await Expense.findAll({where: {userId: user.userId}, order: [['createdAt', 'DESC']] });

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No expenses found" });
    }

    return res.status(200).json(expenses);
  } catch (error) {
    console.log("Error in retrieving expenses", error);
    return res.status(500).json({ message: "Failed to retrieve expenses" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    // console.log(expenseId)
    const { amount, category, description } = req.body;

    if (!amount || !category || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const expense = await Expense.findOne({ where: { id: expenseId, userId: user.userId } });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.amount = amount;
    expense.category = category;
    expense.description = description;

    await expense.save();

    return res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    console.log("Error in updating expense", error);
    return res.status(500).json({ message: "Failed to update expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Expense.findOne({ where: { id: expenseId, userId: user.userId } });


    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    const deletedExpense = { ...expense.toJSON() };
    await expense.destroy();

    return res.status(200).json({ message: "Expense deleted successfully", expense: deletedExpense });
  } catch (error) {
    console.log("Error in deleting expense", error);
    return res.status(500).json({ message: "Failed to delete expense" });
  }
};
