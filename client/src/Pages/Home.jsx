import { useEffect, useState } from "react";
import axios from "axios";
import '../CSS/Home.css';

function Home() {
  const [logs, setLogs] = useState([]);
  const [file, setFile] = useState(null);
  
  useEffect(()=>{
    fetchhistorie();
  },[])
  
  const handleFileUpload = (event) => {
     setFile(event.target.files[0]); // Store the selected file
   
  };

  const handleSubmit = async () => {
    
    
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/imprime/upload", formData, {
         headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File uploaded successfully!");
    } catch (error) {
      console.log("Upload error:", error);
      alert("Error uploading file.");
    }
  };

  const fetchhistorie=()=>{
    axios.get(`http://localhost:5000/api/imprime/impressions`)
    .then((data)=>{setLogs(data.data);})
    .catch(()=>{})
  }

    

  return (

//   
<>
<div className="container">
  <h1>Gestion des Impressions</h1>
  <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-4">
      <input type="file" onChange={handleFileUpload} className="border border-gray-300 rounded p-2 w-full" />
      
      <button onClick={handleSubmit} className="mt-2 bg-blue-500  p-2 rounded" style={{margin:"15px",width:"150px"}}>
        Upload
      </button>
      </div>
  </div>


  
  
 
 <br />
 <br />
 <br />


  <div className="filter-section">
    <h3>
      filtre avec </h3>
    
    <div className="row">
      <div className="col-md-4">
      <select class="form-select"  aria-label=" select ">
        
        <option value="1">Nom de l'imprimante </option>
        <option value="2">Nom de l'utilisateur</option>
        {/* <option value="3">Par date</option> */}
      </select>
      </div>
      <div className="col-md-4">
        
        <input type="text" aria-label="Last name" class="form-control"/>

      </div>
     <div className="col-md-4">
     <button onClick={handleSubmit} className=" rounded" style={{width:"150px",height:"35px"}}>
        filtre
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

</>
  );
}

export default Home;
