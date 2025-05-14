import React, { useEffect, useState } from "react";

const SmartAlerts = ({ logs }) => {
  const [seuilJournalier, setSeuilJournalier] = useState(200);
  const [seuilTache, setSeuilTache] = useState(100);
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    const groupedByPrinterAndDate = {};

    logs.forEach((log) => {
      const printer = log.NameImp;
      const date = new Date(log.Date).toISOString().split("T")[0];
      const time =log.Time
      const key = `${printer}_${date}`;

      if (!groupedByPrinterAndDate[key]) {
        groupedByPrinterAndDate[key] = 0;
      }
      groupedByPrinterAndDate[key] += log.Page || 0;
    });

    const newAlertes = [];

    // ✅ Seuil journalier
    Object.entries(groupedByPrinterAndDate).forEach(([key, totalPages]) => {
      if (totalPages > seuilJournalier) {
        const [printer, date] = key.split("_");
        newAlertes.push({
          type: "Seuil journalier dépassé",
          printer,
          date,
          message: `${printer} a imprimé ${totalPages} pages le ${date}`,
        });
      }
    });

    // ✅ Pic d'impression par tâche
    logs.forEach((log) => {
      if ((log.Page || 0) > seuilTache) {
        newAlertes.push({
          type: "Pic d'impression",
          printer: log.NameImp,
          date: log.Date,
          time:log.Time,
          message: `Tâche anormale : ${log.NameImp} - ${log.Page} pages le ${log.Date} -  Time ${log.Time} `,
        });
      }
    });

    setAlertes(newAlertes);
  }, [logs, seuilJournalier, seuilTache]);

  return (
    <div className="card p-3 mb-4">

      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <label>liste des imprimantes qui dépassent le nombre de pages indiqué </label>
          <input
            type="number"
            className="form-control"
            value={seuilJournalier}
            onChange={(e) => setSeuilJournalier(Number(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <label>liste des impressions qui ont dépassé la valeur indiquée </label>
          <input
            type="number"
            className="form-control"
            value={seuilTache}
            onChange={(e) => setSeuilTache(Number(e.target.value))}
          />
        </div>
      </div>

      {alertes.length === 0 ? (
        <p className="text-success">✅ Aucune anomalie détectée</p>
      ) : (
        <ul className="list-group">
          {alertes.map((a, i) => (
            <li key={i} className="list-group-item list-group-item-warning">
              <strong>🔔 {a.type} :</strong> {a.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SmartAlerts;
