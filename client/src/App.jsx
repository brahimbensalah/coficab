import React from "react";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import {BrowserRouter as Router, Route,Routes} from  'react-router-dom'; 


let App = () => {
  

  return (
    <Router>
     <div>
      <Routes>
        <Route exact  path="/" element={<Home/>} >  </Route>
        <Route  path="/About" element={<About/>} >  </Route>

      </Routes>
    </div>
   </Router>
  );
};

export default App;
