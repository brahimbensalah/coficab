import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../CSS/MonthlyHeatmap.css';

const MonthlyHeatmap = () => {
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [data, setData] = useState([]);
  const [imprimantes, setImprimantes] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/imprime/impressionsByMonth/${month}`);
      const logs = res.data.data || [];

      const uniqueImprimantes = [...new Set(logs.map(log => log.NameImp))];
      const grouped = {};

      logs.forEach(log => {
        if (!grouped[log.NameImp]) grouped[log.NameImp] = {};
        grouped[log.NameImp][log.day] = log.count;
      });

      setData(grouped);
      setImprimantes(uniqueImprimantes);
    } catch (error) {
      console.error('Erreur de récupération des données', error);
    }
  };

  const getColor = (count) => {
    if (!count) return '#f0f0f0';
    const max = 200; // valeur max attendue (à ajuster)
    const ratio = Math.min(count / max, 1);
    const r = Math.round(255 * ratio);
    const g = Math.round(255 * (1 - ratio));
    const b = 0;
    return `rgb(${r},${g},${b})`;
  };

  const exportToPNG = async () => {
    const element = document.getElementById('heatmap');
    const canvas = await html2canvas(element);
    canvas.toBlob(blob => saveAs(blob, `heatmap_${month}.png`));
  };

  const exportToPDF = async () => {
    const element = document.getElementById('heatmap');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('l', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`heatmap_${month}.pdf`);
  };

  return (
    <div className="container mt-4">
      <h4>🗓️ Heatmap des impressions - {month}</h4>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="form-control w-auto"
        />
        <div>
          <button className="btn btn-outline-success me-2" onClick={exportToPNG}>Export PNG</button>
          <button className="btn btn-outline-danger" onClick={exportToPDF}>Export PDF</button>
        </div>
      </div>

      <div id="heatmap" className="heatmap-container">
        <div className="heatmap-grid">
          <div className="sticky-col header"></div>

          {/* Jours de 1 à 31 (fixes) */}
          {[...Array(31)].map((_, i) => (
            <div key={`day-header-${i}`} className="header">{i + 1}</div>
          ))}

          {/* Lignes imprimantes */}
          {imprimantes.map(imp => (
            <React.Fragment key={imp}>
              <div className="sticky-col">{imp}</div>
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const count = data[imp]?.[day] || 0;
                const color = getColor(count);
                return (
                  <div
                    key={`${imp}-${day}`}
                    className="cell"
                    style={{ backgroundColor: color }}
                    title={`${imp} - ${day}/${month.split('-')[1]} : ${count} impressions`}
                  >
                    {count > 0 && <span>{count}</span>}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyHeatmap;
