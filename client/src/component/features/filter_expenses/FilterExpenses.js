import React, {useState} from 'react'
import classes from './FilterExpenses.module.css'
import { decodeToken } from 'react-jwt';
import { useSelector } from 'react-redux';
import {FaRegUserCircle} from 'react-icons/fa'

const FilterExpenses = (props) => {
  const [year, setYear] = useState('all');
  const [month, setMonth] = useState('all');
  const [day, setDay] = useState('all');

  const token = useSelector(state => state.auth.token)
  const decodedToken = decodeToken(token)
  const name = decodedToken && decodedToken.name

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setMonth('all');
    setDay('all');
    props.onMonthChange(month);
    props.onDayChange(day);
    props.onYearChange(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setDay('all');
    props.onDayChange(day);
    props.onMonthChange(e.target.value);
  };

  const handleDayChange = (e) => {
    setDay(e.target.value);
    props.onDayChange(e.target.value);
  };

  // Dynamically generate day options based on the selected month and year
  const dayOptions = [];
  if (year !== 'all' && month !== 'all') {
    const daysInMonth = getDaysInMonth(parseInt(month), parseInt(year));
    for (let i = 1; i <= daysInMonth; i++) {
      const paddedDay = i.toString().padStart(2, '0');
      dayOptions.push(<option key={paddedDay} value={paddedDay}>{paddedDay}</option>);
    }
  }

    return (
        <div className={classes['filter-container']}>
            <div className={classes['filter-items']}>
                <div className={classes['input-box']}>
                    <label htmlFor="yearFilter" className="fs-4 text-light">Sort by year</label><br />
                    <select
                        className="fs-4"
                        value={year}
                        onChange={handleYearChange}
                        aria-label="Default select example"
                    >
                        <option value="all">All</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
                {year !== 'all' && (
                <div className={classes['input-box']}>
                    <label htmlFor="filterMonth" className="fs-4 text-light">Sort by month</label><br />
                    <select
                        className="fs-4"
                        value={month}
                        onChange={handleMonthChange}
                        aria-label="Default select example"
                    >
                        <option value="all">All</option>
                        <option value="01">Jan</option>
                        <option value="02">Feb</option>
                        <option value="03">Mar</option>
                        <option value="04">Apr</option>
                        <option value="05">May</option>
                        <option value="06">Jun</option>
                        <option value="07">Jul</option>
                        <option value="08">Aug</option>
                        <option value="09">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                </div>
                )}
                {month !== 'all' && (
                <div className={classes['input-box']}>
                    <label htmlFor="filterDay" className="fs-4 text-light">Sort by day</label><br />
                    <select
                        className={`fs-4 ${classes['day-select']}`}
                        value={day}
                        onChange={handleDayChange}
                        aria-label="Default select example"
                    >
                        <option value="all">All</option>
                        {dayOptions}
                    </select>
                </div>
                )}
            </div>
            <div>
                <h3 className={classes.username}>
                    <span><FaRegUserCircle /></span>
                    <span>{name}</span>
                </h3>
            </div>
        </div>
  );
};

export default FilterExpenses;