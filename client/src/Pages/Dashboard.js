import React from 'react'
import '../CSS/Dashbord.css'
import Statistique from '../components/statistique.js' 
import EvolutionChart from '../components/EvolutionChart.js';
import PrinterDistribution from '../components/PrinterDistribution.js'
import TopUsersChart  from '../components/TopUsersChart.js'
import PeakHoursChart  from '../components/PeakHoursChart.js'


function Dashboard({logs}) {
  return (
    <>
    <Statistique logs={logs} /> 
    <div className="dashboard-container">
      <div className="chart-card">
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
      



      
    </>
  )
}

export default Dashboard
