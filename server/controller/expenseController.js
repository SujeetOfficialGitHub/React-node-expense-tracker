const Expense = require('../models/expense');
const User = require('../models/user')
const sequelize = require('../util/database')

exports.addExpense = async (req, res) => {
    const {category, description } = req.body; 
    const amount = parseInt(req.body.amount)
    try {
        const transaction = await sequelize.transaction();

        if (!amount || !category || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try{
            const expense = await Expense.create(
                { amount, category, description, userId: user.userId }, {transaction}
                );
    
            await User.update(
                { totalAmount: sequelize.literal(`totalAmount + ${amount}`) },
                { where: { id: user.userId }, transaction}
                );
            await transaction.commit();
    
            return res.status(201).json({ message: "Expense added successfully", expense });
        }catch(error){
            await transaction.rollback();
            throw error;
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
    const { category, description } = req.body;
    const amount = parseInt(req.body.amount);

    const transaction = await sequelize.transaction()

    if (!amount || !category || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const expense = await Expense.findByPk(expenseId);
    const _user = await User.findByPk(user.userId);
    try{ 
        _user.totalAmount += + amount - expense.amount;
        await _user.save({transaction});

        expense.amount = amount;
        expense.category = category;
        expense.description = description;
        await expense.save({transaction});
        
        await transaction.commit();
        console.log(_user.totalAmount)

        return res.status(200).json({ message: "Expense updated successfully", expense })
    }catch(error){
        await transaction.rollback()
        throw error
    }

  } catch (error) {
    console.log("Error in updating expense", error);
    return res.status(500).json({ message: "Failed to update expense" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const transaction = await sequelize.transaction();

    const _user = await User.findByPk(user.userId);
    const expense = await Expense.findByPk(expenseId);
    try{
        _user.totalAmount -= expense.amount;
        await _user.save({transaction})

        const deletedExpense = { ...expense.toJSON() };
        await expense.destroy({transaction});

        await transaction.commit();

        return res.status(200).json({ message: "Expense deleted successfully", expense: deletedExpense });

    }catch(error){
        await transaction.rollback();
        throw error
    }

  } catch (error) {
    console.log("Error in deleting expense", error);
    return res.status(500).json({ message: "Failed to delete expense" });
  }
};
