import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ExpenseForm = ({ expenseId, onSubmit, classes }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // fetch all expenses 
    const expenses = useSelector(state => state.expenses.expenses)

    // Fill data to form for update 
    useEffect(() => {
        if (expenseId) {
            const expense = expenses.find(expense => expense.id === expenseId)
            setAmount(expense.amount);
            setCategory(expense.category);
            setDescription(expense.description);
        } else {
          setAmount('');
          setCategory('');
          setDescription('');
        }
    }, [expenseId, expenses]);

    // Handle form submit 
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const enteredData = {
            amount,
            category,
            description,
        };
    
        onSubmit(enteredData);
        setAmount('');
        setCategory('');
        setDescription('');
    };
  
    return (
      <Form onSubmit={handleSubmit} className={classes && classes['add-expense-form']}>
        <Form.Group className="mb-3 font-title" controlId="exampleForm.ControlAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="font-title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label className="fs-4">Expense Category</Form.Label>
          <Form.Select
            className="fs-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Default select example"
          >
            <option>Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Bill">Bill</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Food">Food</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 font-title" controlId="exampleForm.ControlDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="font-title"
            placeholder="Write description"
          />
        </Form.Group>
        <Button type="submit" className="font-title">
          {expenseId ? 'Update' : 'Submit'}
        </Button>
      </Form>
    );
  };

export default ExpenseForm