import React, { useState, useEffect } from "react";

const EstimationCout = ({ logs }) => {
  const [coutParPage, setCoutParPage] = useState(0.05); // par défaut 0.05€
  const [coutTotal, setCoutTotal] = useState(0);

  useEffect(() => {
    const totalPages = logs.reduce((sum, log) => sum + (log.Page || 0), 0);
    setCoutTotal((totalPages * coutParPage).toFixed(2));
  }, [logs, coutParPage]);

  return (
    <div className="card p-3 mb-4">
      <h5>💰 Estimation du coût d'impression</h5>
      <div className="d-flex flex-wrap gap-3 align-items-center mt-2">
        <div>
          <label htmlFor="coutParPage" className="form-label">
            Coût par page (TND) :
          </label>
          <input
            type="number"
            id="coutParPage"
            className="form-control"
            value={coutParPage}
            onChange={(e) => setCoutParPage(parseFloat(e.target.value))}
            step="0.01"
            min="0"
          />
        </div>
        <div className="ms-auto">
          <h6>
            📄 Pages totales :{" "}
            {logs.reduce((sum, log) => sum + (log.Page || 0), 0)}
          </h6>
          <h6>
            💸 Coût estimé : <strong>{coutTotal} </strong>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default EstimationCout;
