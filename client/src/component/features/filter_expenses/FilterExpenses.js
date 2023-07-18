import React, {useState} from 'react'
import classes from './FilterExpenses.module.css'

const FilterExpenses = (props) => {
  const [year, setYear] = useState(0)
  const [month, setMonth] = useState('')

  const handleYearChange = (e) => {
    setYear(e.target.value)
    setMonth('')
    props.onYearChange(e.target.value)
  }
  const handleMonthChange = (e) => {
    setMonth(e.target.value)
    props.onMonthChange(e.target.value)
  }
  return (
    <div className={classes['filter-form']}>
        <div className={classes['input-box']}>
            <label htmlFor="yearFilter" className='fs-4 text-light'>Sort by year</label><br />
            <select className='fs-4' value={year} onChange={handleYearChange} aria-label="Default select example">
                <option value="all">All</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
        </div>
        {year !=='' && year !== 0 &&
        <div className={classes['input-box']}>
            <label htmlFor="filterMonth" className='fs-4 text-light'>Sort by month</label><br />
            <select className='fs-4' value={month} onChange={handleMonthChange} aria-label="Default select example">
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
        }
    </div>
  )
}

export default FilterExpenses