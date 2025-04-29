import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../CSS/Dashbord.css'

function Dashboard({ logs }) {
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [printerStatus, setPrinterStatus] = useState({});
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    if (!logs || logs.length === 0) return;

    //
    const printerPageCount = {};
    // Nombre de pages imprimées par imprimante
    logs.forEach(log => {
      const printer = log.NameImp;
      const pages = parseInt(log.Page) || 0;
      if (printerPageCount[printer]) {
        printerPageCount[printer] += pages;
      } else {
        printerPageCount[printer] = pages;
      }
    });

    const labels = Object.keys(printerPageCount);
    const data = Object.values(printerPageCount);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Pages imprimées',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });
   


  

    //  Weekly Stats
    const weekly = Array(7).fill(0); // 0 = Sunday
    logs.forEach((log) => {
      if (log.Date) {
        const day = new Date(log.Date).getDay();
        weekly[day]++;
      }
    });
    setWeeklyStats(weekly);

    //  Heatmap (printer usage)
    // const printerCount = {};
    // logs.forEach((log) => {
    //   printerCount[log.NameImp] = (printerCount[log.NameImp] || 0) + 1;
    // });
    // setPrinterHeatmap(printerCount);

    //  Total Pages
    const pageCount = logs.reduce((sum, log) => sum + (parseInt(log.Page) || 0), 0);
    setTotalPages(pageCount);

    // ✅/❌ Printer status (mock: if used today = active)
    const status = {};
    const today = new Date().toISOString().split('T')[0];
    logs.forEach((log) => {
      if (log.Date === today) {
        status[log.NameImp] = 'active';
      } else if (!status[log.NameImp]) {
        status[log.NameImp] = 'inactive';
      }
    });
    setPrinterStatus(status);

  }, [logs]);
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nombre de pages imprimées par imprimante',
        font: {
          size: 20
        }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Pages'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Imprimantes'
        }
      }
    }
  };

  if (!chartData) {
    return (
      <div className="container mt-5 text-center">
        <p>Aucune donnée disponible pour le moment.</p>
      </div>
    );
  }
  return (
    <>
          <h2 className="">📊 Tableau de bord des impressions</h2>

    <div className=" container-fluid dashboard-container">
        <div className="chart-card">
      <Bar data={chartData} options={options} />
    </div>
  

    

      {/* Weekly Activity */}
      <div className="chart-card">
        <h5>Statistiques Hebdomadaires</h5>
        <Bar
          data={{
            labels: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
            datasets: [{
              label: 'Impressions',
              data: weeklyStats,
              backgroundColor: '#28a745',
            }],
          }}
        />
      </div>

     

      {/* Total Pages */}
      <div className="chart-card">
        <h5>Consommation de papier estimée</h5>
        <p>
          📄 <strong>{totalPages}</strong> pages imprimées
        </p>
      {/* Printer Status */}

        <h5>État des imprimantes</h5>
        <ul>
          {Object.entries(printerStatus).map(([name, status]) => (
            <li key={name}>
              {name} : <span style={{
                color: status === 'active' ? 'green' : 'red',
                fontWeight: 'bold'
              }}>{status === 'active' ? '🟢 Actif' : '🔴 Inactif'}</span>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
    </>
  );
}

export default Dashboard;
