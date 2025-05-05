import React from 'react'
import { Doughnut } from 'react-chartjs-2';


function PrinterDistribution({ logs }) {
    const printerMap = logs.reduce((acc, curr) => {
        acc[curr.NameImp] = (acc[curr.NameImp] || 0) + 1;
        return acc;
      }, {});
    
      const labels = Object.keys(printerMap);
      const data = Object.values(printerMap);
    
      const chartData = {
        labels,
        datasets: [{
          label: 'Répartition des impressions',
          data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ]
        }]
      };
  return (
    <div>
        <Doughnut data={chartData} />
      
    </div>
  )
}

export default PrinterDistribution
