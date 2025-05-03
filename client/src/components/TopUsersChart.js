import React from 'react'
import { Bar } from 'react-chartjs-2';


function TopUsersChart({logs}) {
   
        const userMap = logs.reduce((acc, curr) => {
          acc[curr.User] = (acc[curr.User] || 0) + 1;
          return acc;
        }, {});
      
        const sortedUsers = Object.entries(userMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);
      
        const labels = sortedUsers.map(([user]) => user);
        const data = sortedUsers.map(([_, count]) => count);
      
        const chartData = {
          labels,
          datasets: [{
            label: 'Top utilisateurs',
            data,
            backgroundColor: '#36A2EB'
          }]
        };
      
        const options = {
          indexAxis: 'y',
        };
  return (
    <div style={{width:"600px",height:"350px"}}>
        <Bar data={chartData} options={options} />
      
    </div>
  )

}

export default TopUsersChart
