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
  //for filter date
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //navbarre date
  const [currentTime, setCurrentTime] = useState(new Date());
  const formattedTime = currentTime.toLocaleString(); // e.g. "4/8/2025, 10:15:30 AM"



  const [resultatImp,setresultatImp]= useState("")
  const [resultatNBPage,setresultatNBPage]= useState()

  
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
    
  const handleFiltre = (filtretype,startDate,endDate) => {

    if((filtretype === "all")) { 
          if((startDate === '') && (endDate === '')){

            axios.get(`http://localhost:5000/api/imprime/impressions`)
            .then((data)=>{
              setLogs(data.data);
              setresultatImp(data.data.length)
              setresultatNBPage(data.data.reduce((sum, log) => sum + (log.Page || 0), 0))

            })
            .catch(()=>{})   
          }
          else if ((startDate !== '') && ( endDate === '')){
            axios.get(`http://localhost:5000/api/imprime/impressionsByStartDate/${startDate}`)
            .then((data)=>{
              setLogs(data.data);
              setresultatImp(data.data.length)
              setresultatNBPage(logs.reduce((sum, log) => sum + (log.Page || 0), 0))
          })
            .catch(()=>{})   
          }
          else if ((startDate !== '') && ( endDate !== '')){
            axios.get(`http://localhost:5000/api/imprime/impressionsByStartEndDate/${startDate}/${endDate}`)
            .then((data)=>{
              setLogs(data.data);
              setresultatImp(data.data.length)
              setresultatNBPage(data.data.reduce((sum, log) => sum + (log.Page || 0), 0))
          })
            .catch(()=>{})  
          }
          } 
    else if(filtretype !== "all")  {
    if ((startDate === '') && (endDate === '')){
     
      axios.get(` http://localhost:5000/api/imprime/impressionsByIMP/${filtretype}`)
      .then((data)=>{
       console.log('================type 2-1====================');
       console.log(data.data);
       console.log('====================================');
     setLogs(data.data);
     setresultatImp(data.data.length)
     setresultatNBPage(data.data.reduce((sum, log) => sum + (log.Page || 0), 0))
   })
      .catch(()=>{})   
   }
    else if((startDate !== '') && (endDate === '')){
      axios.get(`http://localhost:5000/api/imprime/impressionsByImp&StartDate/${filtretype}/${startDate}`)
      .then((data)=>{
       console.log('================type 2-1====================');
       console.log(data.data);
       console.log('====================================');
     setLogs(data.data);
     setresultatImp(data.data.length)
     setresultatNBPage(data.data.reduce((sum, log) => sum + (log.Page || 0), 0))
   })
      .catch(()=>{})   
   }
   else if((startDate !== '') && (endDate !== '')){
    axios.get(`http://localhost:5000/api/imprime/impressionsByImp&StartEndDate/${filtretype}/${startDate}/${endDate}`)
    .then((data)=>{
     console.log('================type 2-3====================');
     console.log(data.data);
     console.log('====================================');
   setLogs(data.data);
   setresultatImp(data.data.length)
   setresultatNBPage(data.data.reduce((sum, log) => sum + (log.Page || 0), 0))
 })
    .catch(()=>{})   
 }
  }
    
}

  const getAllprinterName = () => {
  axios.get(`http://localhost:5000/api/printer/getAllPrinterName`)
  .then((data)=>{
    setprinterName(data.data);
    setresultatImp(data.data.length)
    setresultatNBPage(data.data.reduce((sum, log) => sum + (log.Page || 0), 0))  
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
<>


{/* <!-- Page Content --> */}
<nav className="navbar " style={{backgroundColor:"#020495"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src={logo} alt="" className="d-inline-block align-text-top"/>      
    </a>
  <span className="navbar-text text-white d-flex">
          {formattedTime}
        </span>
  </div>
</nav>
<div className="container-fluid">




<div className="container"> 
 <br/>
 <br/>
 <br/>


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
      handleFiltre(filtretype,startDate,endDate)
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
                {/* <th className="col-2">ID</th> */}
                
                <th className="col-2">NameImp</th>
                
               
                <th className="col-2">NB PAGE</th>
               
             
            </tr>
    </thead>
    <tbody>
      
    
            <tr>
                {/* <td  >{log.id}</td> */}
                <td  >{resultatImp}</td>
                <td  >{resultatNBPage}</td>
              
              </tr>
          
 
    </tbody>
  </table>


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
