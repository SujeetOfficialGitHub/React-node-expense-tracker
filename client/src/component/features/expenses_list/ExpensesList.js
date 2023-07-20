import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Pagination } from 'react-bootstrap';

import classes from './ExpensesList.module.css';
import Expense from '../expense/Expense';
import FilterExpenses from '../filter_expenses/FilterExpenses';
import { getExpenses } from '../../../store/features/expenseSlice';

const ExpensesList = (props) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  // Fetch All Expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        await dispatch(getExpenses()).unwrap();
      } catch (error) {
        if (error && error.message) {
          setError(error.message);
        }
        // console.log(error);
      }
    };
    fetchExpenses();
  }, [dispatch]);

  const { expenses, loading } = useSelector((state) => state.expenses);
  const [filteredData, setFilteredData] = useState(expenses);

  const itemsPerPage = 2; // Number of items to display per page
  const maxPaginationItems = 5; // Maximum number of pagination items to show at a time
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages based on the array length and itemsPerPage
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Calculate the range of pagination items to display
  const range = {
    start: Math.max(1, currentPage - Math.floor(maxPaginationItems / 2)),
    end: Math.min(totalPages, currentPage + Math.floor(maxPaginationItems / 2)),
  };

  // Adjust the range if the current page is near the start or end
  if (currentPage <= Math.ceil(maxPaginationItems / 2)) {
    range.end = maxPaginationItems;
  } else if (currentPage >= totalPages - Math.floor(maxPaginationItems / 2)) {
    range.start = totalPages - maxPaginationItems + 1;
  }

  // Filter Data
  useEffect(() => {
    let filteredExpenses = expenses;

    if (selectedYear && selectedYear !== 'all') {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const itemYear = new Date(expense.createdAt).getFullYear();
        return itemYear.toString() === selectedYear;
      });
    }

    if (selectedMonth && selectedMonth !== 'all') {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const itemMonth = (new Date(expense.createdAt).getMonth() + 1).toString().padStart(2, '0');
        return itemMonth === selectedMonth;
      });
    }

    if (selectedDay && selectedDay !== 'all') {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const itemDay = new Date(expense.createdAt).getDate().toString().padStart(2, '0');
        return itemDay === selectedDay;
      });
    }

    setFilteredData(filteredExpenses);
  }, [expenses, selectedYear, selectedMonth, selectedDay, currentPage]); // Include currentPage in the dependency array

  const handleYearChange = (selectedYear) => {
    setSelectedYear(selectedYear);
  };

  const handleMonthChange = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };

  const handleDayChange = (selectedDay) => {
    setSelectedDay(selectedDay);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the range of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={classes['expense-list']}>
      <FilterExpenses
        onYearChange={handleYearChange}
        onMonthChange={handleMonthChange}
        onDayChange={handleDayChange}
      />
      {error && filteredData.length === 0 ? (
        <p className={classes['not-found']}>No expenses found.</p>
      ) : (
        currentItems.map((expense) => (
          <Expense
            key={expense.id}
            id={expense.id}
            category={expense.category}
            amount={expense.amount}
            description={expense.description}
            date={expense.createdAt}
            onPopulateToForm={props.onPopulateToForm}
          />
        ))
      )}
      {loading && <Spinner animation="border" className="d-block mx-auto m-3" variant="primary" />}

      <div className="pagination-container">
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {range.start > 1 && <Pagination.Ellipsis />}
          {Array.from({ length: range.end - range.start + 1 }, (_, index) => (
            <Pagination.Item
              key={range.start + index}
              active={range.start + index === currentPage}
              onClick={() => handlePageChange(range.start + index)}
            >
              {range.start + index}
            </Pagination.Item>
          ))}
          {range.end < totalPages && <Pagination.Ellipsis />}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </div>
  );
};

export default ExpensesList;
