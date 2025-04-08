import { useEffect, useState } from "react";
import axios from "axios";
import '../CSS/Home.css';
import logo from '../Images/logo.png'

function Home() {
  const [logs, setLogs] = useState([]);
  const [printerName, setprinterName] = useState([]);
  const [file, setFile] = useState(null);
  const [filtretype, setType] = useState("all");
  const [filtreName, setName] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const formattedTime = currentTime.toLocaleString(); // e.g. "4/8/2025, 10:15:30 AM"

  
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
    
  const handleFiltre = (filtretype,filtreName) => {
    if(filtretype === "impr") { axios.get(`http://localhost:5000/api/imprime/impressionsByImp/${filtreName}`)
      .then((data)=>{setLogs(data.data);})
      .catch(()=>{})   
  }
  else if(filtretype === "user") { axios.get(`http://localhost:5000/api/imprime/impressionsByUser/${filtreName}`)
     .then((data)=>{setLogs(data.data);})
     .catch(()=>{})   
  }
  else if(filtretype === "all") { axios.get(`http://localhost:5000/api/imprime/impressions`)
     .then((data)=>{setLogs(data.data);})
     .catch(()=>{})   
  }
  else {
    alert("Name dosn't existe !");

  }  
}
  const getAllprinterName = () => {
  axios.get(`http://localhost:5000/api/printer/getAllPrinterName`)
  .then((data)=>{
    setprinterName(data.data);  
  })
  .catch(()=>{})   
}




  // const handleSubmit = async () => {    
    
  //   if (!file) {
  //     alert("Please select a file first!");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/imprime/upload", formData, {
  //        headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     alert("File uploaded successfully!");
  //   } catch (error) {
  //     // alert("Error uploading file.");
  //   }
  // };

  const fetchhistorie=()=>{
    axios.get(`http://localhost:5000/api/imprime/impressions`)
    .then((data)=>{setLogs(data.data);})
    .catch(()=>{})
  }


  const handleStartChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Si la date de fin est plus petite que la nouvelle date de début, on la met à jour
    if (endDate && newStartDate > endDate) {
      setEndDate(newStartDate);
    }
  };


    

  return (

//   
<>


{/* <!-- Page Content --> */}


<nav class="navbar " style={{backgroundColor:"#020495"}}>
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src={logo} alt="" class="d-inline-block align-text-top"/>      
    </a>
  <span className="navbar-text text-white d-flex">
          {formattedTime}
        </span>
  </div>
</nav>
<div class="container-fluid">




<div className=""> 
 <br />
 <br />
 <br />


  <div className="filter-section">
   
    
    <div className="row">
      <div className="col-md-4">
      <select className="form-select" name="filtre"  onChange={e => setType(e.target.value)}  aria-label=" select ">    
      <option value="all">All</option>
      {printerName.map((name, key) => (
              <option value={name} key={key}>
                {name}
              </option>
        ))} 
      </select>
      </div>
      <div className="col-md-4">
      <div className="d-flex align-items-center gap-2" style={{marginTop:"-5px"}}>
      <label htmlFor="start" className="form-label m-0">De :</label>
      <input
        type="date"
        id="start"
        className="form-control"
        value={startDate}
        onChange={handleStartChange}
      />

      <label htmlFor="end" className="form-label m-0">À :</label>
      <input
        type="date"
        id="end"
        className="form-control"
        value={endDate}
        min={startDate} // empêche de choisir une date avant startDate
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>

      </div>
     <div className="col-md-4">
     <button  onClick={()=>{
      handleFiltre(filtretype,filtreName)
     }} className="custom-btn btn-3" >
        
        <span>filtre</span>
      </button>
     </div>
    </div>
 
  </div>

  <br />
  <br />
  <br />

  <table className="table table-bordered">
    <thead>
    <tr>
                <th className="col-2">ID</th>
                <th className="col-2">NameImp</th>
                <th className="col-2">USER</th>
                <th className="col-2">PAGE</th>
                <th className="col-2">Result</th>
                <th className="col-2">DATE</th>
                <th className="col-2">TIME</th>
            </tr>
    </thead>
    <tbody>
      
      {logs.map((log) => (
            <tr key={log.id}>
                <td  >{log.id}</td>
                <td  >{log.NameImp}</td>
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
