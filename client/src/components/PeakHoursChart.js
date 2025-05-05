import React from 'react'
import { Bar } from 'react-chartjs-2';


function PeakHoursChart({logs}) {
    const hourMap = logs.reduce((acc, curr) => {
        const hour = curr.Time.split(':')[0];
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
      }, {});
    
      const labels = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
      const data = labels.map(hour => hourMap[hour] || 0);
    
      const chartData = {
        labels,
        datasets: [{
          label: 'Impressions par heure',
          data,
          backgroundColor: '#FF9F40',
          
        }]
      };
  return (
    <div style={{width:"600px",height:"350px"}}>
        <Bar data={chartData} />

      
    </div>
  )
}

export default PeakHoursChart
