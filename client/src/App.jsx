import React from "react";
import CofatItServices from "./Pages/CofatItServices.js";
import LandingPage from "./Pages/LandingPage.js";

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
        
    <Router>
     <div>
      <Routes>
        <Route  path="/LandingPage" element={<LandingPage/>} >  </Route>
        <Route exact  path="/CofatItServices" element={<CofatItServices/>} >  </Route>

      </Routes>
    </div>
   </Router>
 
   </>

  );
};

export default App;
