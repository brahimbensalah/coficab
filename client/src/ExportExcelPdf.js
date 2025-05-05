import * as XLSX from "xlsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToExcel = (data, fileName = "impressions") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Impressions");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

export const exportToPDF = (data, fileName = "rapport") => {
    const doc = new jsPDF();
    const headers = Object.keys(data[0] || {});
    const rows = data.map(row => headers.map(h => row[h]));
  
    doc.text("Rapport des impressions", 14, 15);
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 25,
      styles: { fontSize: 8 },
    });
  
    doc.save(`${fileName}.pdf`);
  };