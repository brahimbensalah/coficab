import React from "react";
import Home from "./Pages/Home.jsx";
import {BrowserRouter as Router, Route,Routes} from  'react-router-dom'; 
import  { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle.js";

let App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  

  return (

    <>
        <div className={`container-fluid py-4`}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
    <Router>
     <div>
      <Routes>
        <Route exact  path="/" element={<Home/>} >  </Route>
        {/* <Route  path="/About" element={<About/>} >  </Route> */}

      </Routes>
    </div>
   </Router>
   </div>
   </>

  );
};

export default App;
