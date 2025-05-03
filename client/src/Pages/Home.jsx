import { useEffect, useState } from "react";
import axios from "axios";
import '../CSS/Home.css';
import Statistique from '../components/statistique.js' 
import MonthlyHeatmap from '../components/MonthlyHeatmap.js'

import SmartAnalytics from '../components/SmartAnalytics.js';

import logo from '../Images/logo.png'
import { exportToExcel, exportToPDF } from '../ExportExcelPdf';


function Home() {
  const [logs, setLogs] = useState([]);
  const [printerName, setprinterName] = useState([]);
  const [filtretype, setType] = useState("all");
  //for filter date
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //navbarre date
  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedTime = currentTime.toLocaleString(); // e.g. "4/8/2025, 10:15:30 AM"

  //For the filter
  const [userFilter, setUserFilter] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);



  useEffect(()=>{ 
    fetchhistorie();
    getAllprinterName();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // cleanup
  },[])


  
  // const handleFileUpload = (event) => {
  //    setFile(event.target.files[0]); // Store the selected file   
  // };
// const handleFiltre = async () => {
//   try {
//     let url = "";
//     let queryParams = [];

//     if (filtretype !== "all") {
//       queryParams.push(`printer=${filtretype}`);
//     }

//     if (startDate) queryParams.push(`startDate=${startDate}`);
//     if (endDate) queryParams.push(`endDate=${endDate}`);
//     if (userFilter) queryParams.push(`user=${userFilter}`);
//     if (startHour) queryParams.push(`startHour=${startHour}`);
//     if (endHour) queryParams.push(`endHour=${endHour}`);

//     url = `http://localhost:5000/api/imprime/impressionsAdvanced`;
//     if (queryParams.length > 0) {
//       url += "?" + queryParams.join("&");
//     }

//     const { data } = await axios.get(url);
//     setLogs(data);

//   } catch (err) {
//     console.error("Erreur lors du filtrage :", err);
//   }
// };
//   const handleStartChange = (e) => {
//     const newStartDate = e.target.value;
//     setStartDate(newStartDate);
//     if (endDate && newStartDate > endDate) {
//       setEndDate(newStartDate);
//     }
//   };
const handleFiltre = async () => {
  try {
    let url = "";

    if (filtretype === "all") {
      if (!startDate && !endDate) {
        url = `http://localhost:5000/api/imprime/impressions`;
      } else if (startDate && !endDate) {
        url = `http://localhost:5000/api/imprime/impressionsByStartDate/${startDate}`;
      } else if (startDate && endDate) {
        url = `http://localhost:5000/api/imprime/impressionsByStartEndDate/${startDate}/${endDate}`;
      }
    } else {
      if (!startDate && !endDate) {
        url = `http://localhost:5000/api/imprime/impressionsByIMP/${filtretype}`;
      } else if (startDate && !endDate) {
        url = `http://localhost:5000/api/imprime/impressionsByImp&StartDate/${filtretype}/${startDate}`;
      } else if (startDate && endDate) {
        url = `http://localhost:5000/api/imprime/impressionsByImp&StartEndDate/${filtretype}/${startDate}/${endDate}`;
      }
    }

    if (url) {
      const response = await axios.get(url);
      const data = response.data;

      setLogs(data);
     
    }
  } catch (err) {
    console.error("Erreur lors du filtrage :", err);
  }
};

const handleStartChange = (e) => {
  const newStartDate = e.target.value;
  setStartDate(newStartDate);
  if (endDate && newStartDate > endDate) {
    setEndDate(newStartDate);
  }
};


  const getAllprinterName = () => {
  axios.get(`http://localhost:5000/api/printer/getAllPrinterName`)
  .then((data)=>{
    setprinterName(data.data);
   
  })
  .catch(()=>{})   
}

  const fetchhistorie=()=>{
    axios.get(`http://localhost:5000/api/imprime/impressions`)
    .then((data)=>{setLogs(data.data);})
    .catch(()=>{})
  }


  return (  
<>


{/* <!-- Page Content --> */}
<nav className="navbar " style={{backgroundColor:"#020495"}}>
  <div className="container">
    <a className="navbar-brand" href="">
      <img src={logo} alt="" className="d-inline-block align-text-top"/>      
    </a>
  <span className="navbar-text text-white d-flex">
          {formattedTime}
        </span>
  </div>
</nav>
<div className="container-fluid">
<div className="container"> 
 <br/> <br/> <br/>
 <div className="filter-section">
 <div className="text-end mb-2">
 <div className="d-flex gap-2 justify-content-end mb-3">
  <button className="btn btn-success" onClick={() => exportToExcel(logs)}>
    📄 Export Excel
  </button>
  <button className="btn btn-danger" onClick={() => exportToPDF(logs)}>
    🧾 Export PDF
  </button>
</div>
 {/* backend doit supporter cette route  GET /api/imprime/impressionsAdvanced?printer=X&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&user=abc&startHour=08:00&endHour=17:00 */}
  <button className="btn btn-link" onClick={() => setShowAdvanced(!showAdvanced)}>
    {showAdvanced ? "Masquer les filtres avancés ▲" : "Afficher les filtres avancés ▼"}
  </button>
</div>

{showAdvanced && (
  <div className="advanced-filters border p-3 rounded mb-3" style={{ backgroundColor: "#f9f9f9" }}>
    <div className="row">
      <div className="col-md-4 mb-2">
        <label className="form-label">Utilisateur :</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nom d'utilisateur"
          value={userFilter}
          onChange={e => setUserFilter(e.target.value)}
        />
      </div>
      <div className="col-md-4 mb-2">
        <label className="form-label">Heure début :</label>
        <input
          type="time"
          className="form-control"
          value={startHour}
          onChange={e => setStartHour(e.target.value)}
        />
      </div>
      <div className="col-md-4 mb-2">
        <label className="form-label">Heure fin :</label>
        <input
          type="time"
          className="form-control"
          value={endHour}
          onChange={e => setEndHour(e.target.value)}
        />
      </div>
    </div>
  </div>
)}
  <div className="row align-items-end">
    <div className="col-md-3">
      <label className="form-label">Imprimante :</label>
      <select
        className="form-select"
        value={filtretype}
        onChange={e => setType(e.target.value)}
      >
        <option value="all">Toutes</option>
        {printerName.map((name, key) => (
          <option value={name} key={key}>{name}</option>
        ))}
      </select>
    </div>

    <div className="col-md-3">
      <label className="form-label">Date début :</label>
      <input
        type="date"
        className="form-control"
        value={startDate}
        onChange={handleStartChange}
      />
    </div>

    <div className="col-md-3">
      <label className="form-label">Date fin :</label>
      <input
        type="date"
        className="form-control"
        value={endDate}
        min={startDate}
        onChange={e => setEndDate(e.target.value)}
      />
    </div>

    <div className="col-md-3">
      <button onClick={handleFiltre} className="btn btn-primary w-100">
        Appliquer le filtre
      </button>
    </div>
  </div>
</div>
  <br />
  <br />

  <MonthlyHeatmap />


  <br />
  <br />
  <SmartAnalytics logs={logs} />

 <Statistique logs={logs} />


  <br />
    

  {/* <table className="table table-bordered">
    <thead>
    <tr>
              
                
                <th className="col-2">NameImp</th>
                
               
                <th className="col-2">NB PAGE</th>
               
             
            </tr>
    </thead>
    <tbody>
      
    
            <tr>
               
                <td  >{resultatImp}</td>
                <td  >{resultatNBPage}</td>
              
              </tr>
          
 
    </tbody>
  </table> */}


  <table className="table table-bordered">
    <thead>
    <tr>
                {/* <th className="col-2">ID</th> */}
                <th className="col-1">ID</th>
                <th className="col-2">NameImp</th>
                <th className="col-1">UID</th>
                <th className="col-2">USER</th>
                <th className="col-1">PAGE</th>
                <th className="col-2">Result</th>
                <th className="col-2">DATE</th>
                <th className="col-2">TIME</th>
            </tr>
    </thead>
    <tbody>
      
      {logs.map((log) => (
            <tr key={log.id}>
                {/* <td  >{log.id}</td> */}
                <td  >{log.id}</td>
                <td  >{log.NameImp}</td>
                <td  >{log.UID}</td>
                <td >{log.User}</td>
                <td >{log.Page}</td>
                <td >{log.Result}</td>
                <td >{log.Date}</td>
                <td >{log.Time}</td>
              </tr>
            ))}
 
    </tbody>
  </table>
</div>

</div>



</>
  );
}

export default Home;
