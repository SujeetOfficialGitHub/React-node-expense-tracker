import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Button, Table} from 'react-bootstrap';

const PDFReport = ({ expenses, title }) => {
  const pdfContainerRef = useRef(null);

  // This function will be called when the button is clicked.
  const handleDownloadButtonClick = () => {
    const generatePDFReport = async () => {
      const pdf = new jsPDF();

      // Convert HTML to canvas
      const canvas = await html2canvas(pdfContainerRef.current);
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 page width in mm (approx.)
      const imgHeight = (imgWidth * canvas.height) / canvas.width;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${title}_report.pdf`);
    };

    generatePDFReport();
  };

  return (
    <div>
      <div ref={pdfContainerRef}>
        <h1 className='text-center m-3'>{title}</h1>
        <Table striped bordered hover className='font-title'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.createdAt}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button onClick={handleDownloadButtonClick} className='font-title'>Download PDF</Button>
    </div>
  );
};

export default PDFReport;
