import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../CSS/Dashbord.css'
import EvolutionChart from './EvolutionChart.js';
import PrinterDistribution from './PrinterDistribution.js'
import TopUsersChart  from './TopUsersChart.js'
import PeakHoursChart  from './PeakHoursChart.js'


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

    <div className="container-fluid dashboard-container">
      <div className='row'> 



        <div className="col-12 chart-card  ">
             <Bar data={chartData} options={options} />
        </div>
  

    <br/>
      
      {/* Weekly Activity */}
      <div className="col-md-6 chart-card">
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
      <div className="col-md-6 chart-card">
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
      <div className="dashboard-container">
      <div className="chart-card ">
        <h3>📈 Évolution des impressions</h3>
        <EvolutionChart logs={logs} />
      </div>

      <div className="chart-card">
        <h3> Utilisation par imprimante</h3>
        <PrinterDistribution logs={logs} />
      </div>

      <div className="chart-card">
        <h3>🏆 Top 5 utilisateurs</h3>
        <TopUsersChart logs={logs} />
      </div>

      <div className="chart-card">
        <h3>⏰ Heures de pic</h3>
        <PeakHoursChart logs={logs} />
      </div>
      
    </div>


      
    </div>


    </div>

    </>
  );
}

export default Dashboard;
