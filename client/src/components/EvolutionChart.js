import React from 'react'
import { Line } from 'react-chartjs-2';

function EvolutionChart({ logs }) {
     // Regrouper par date
  const grouped = logs.reduce((acc, curr) => {
    acc[curr.Date] = (acc[curr.Date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(grouped).sort();
  const data = Object.values(grouped);

  const chartData = {
    labels,
    datasets: [{
      label: 'Nombre d’impressions',
      data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  return (
    <>
    <Line data={chartData} />
      
    </>
  )
}

export default EvolutionChart
