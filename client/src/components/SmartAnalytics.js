import React from "react";
import EstimationCout from "./EstimationCout";
import SmartAlerts from "./SmartAlerts";



const SmartAnalytics = ({ logs }) => {
  const calculerMoyennePages = () => {
    if (!logs || logs.length === 0) return 0;
    const totalPages = logs.reduce((sum, log) => sum + (log.Page || 0), 0);
    return (totalPages / logs.length).toFixed(2);
  };

  const detecterAnomalies = (seuil = 100) => {
    return logs.filter((log) => log.Page && log.Page > seuil);
  };

  const prevoirConsommation = () => {
    const groupedByDate = {};

    logs.forEach((log) => {
      const date = log.Date;
      if (!groupedByDate[date]) groupedByDate[date] = 0;
      groupedByDate[date] += log.Page || 0;
    });

    const total = Object.values(groupedByDate).reduce((sum, val) => sum + val, 0);
    const moyenneParJour = total / Object.keys(groupedByDate).length || 0;

    return (moyenneParJour * 30).toFixed(0); // estimation mensuelle
  };

  const moyennePages = calculerMoyennePages();
  const anomalies = detecterAnomalies();
  const previsionPapier = prevoirConsommation();

  return (
    <div className="card p-3 shadow mb-4">
      <h5 className="mb-3">🧠 Analyse intelligente</h5>
      <ul className="list-group list-group-flush">
        {/* <li className="list-group-item">
          📊 <strong>Moyenne pages/impression :</strong> {moyennePages}
        </li> */}
        <li className="list-group-item">
          🧾 <strong>Consommation papier par mois :</strong> {previsionPapier} pages
        </li>
        <li className="list-group-item">
          ⚠️ <strong>Anomalies détectées :</strong>{" "}
          {anomalies.length > 0 ? (
            <span className="text-danger fw-bold">{anomalies.length}</span>
          ) : (
            <span className="text-success">Aucune</span>
          )}
        </li>
        <li className="list-group-item">
        <SmartAlerts logs={logs} />

        </li>
        <li className="list-group-item">
        <EstimationCout logs={logs} />

        </li>
      </ul>
    </div>
  );
};

export default SmartAnalytics;
