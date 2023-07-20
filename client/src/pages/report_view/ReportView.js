import React, { useEffect } from 'react'
import PDFReport from '../../component/features/pdf_report/PDFReport'
import { useDispatch, useSelector } from 'react-redux'
import { getExpenses } from '../../store/features/expenseSlice'
import Helmet from '../../component/common/Helmet'
import { Container } from 'react-bootstrap'

const ReportView = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getExpenses())
    }, [dispatch])
    const expenses = useSelector(state => state.expenses.expenses)

  return (
       <Helmet title="Report">
            <Container>
                <PDFReport title="Expenses Report" expenses={expenses} />
            </Container>
       </Helmet>
  )
}

export default ReportView