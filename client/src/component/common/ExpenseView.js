import React from 'react'

const ExpenseView = ({expense}) => {
  return (
    <div>
        <dl>
            <dt>Category</dt>
            <dd>{expense.category}</dd>

            <dt>Amount</dt>
            <dd>Rs{expense.amount}</dd>

            <dt>Description</dt>
            <dd>{expense.description}</dd>
        </dl>
    </div>
  )
}

export default ExpenseView