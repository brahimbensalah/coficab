import React, { useState } from "react";
import logo from '../Images/logo.png'
import '../CSS/LandingPage.css'
import { FiArrowLeft } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { Routes } from "react-router"


function LandingPage() {

     const [clicked, setClicked] = useState(false);
     const [activeSide, setActiveSide] = useState("");

        const handleClick = (side) => {
            setActiveSide(side);
            setClicked(true);
        };

    
  return (
    <>
        <>
        <nav className="navbar" >
          <div className="container-fluid">
            <a className="navbar-brand" href="/LandingPage">
              <img src={logo} alt="" className="d-inline-block align-text-top"/>      
            </a>
    
          </div>
        </nav>
     <div className="hero-container">
        {clicked && (
        <button className="back-button" onClick={() => {
            setClicked(false);
            setActiveSide("");
        }}>
            <FiArrowLeft style={{ marginRight: "8px" }} />
            Back
        </button>
        )}
      <div className="overlay">
        {!clicked ? (
          <div className="row row-LandingPage">
            <div className="col-3 col-style clickable" onClick={() => handleClick("Tunis")}>
              <h1>Tunis</h1>
              
            </div>
            <div className="col-3 col-style clickable" onClick={() => handleClick("Egypt")}>
              <h1>Egypt</h1>             
            </div>
             <div className="col-3 col-style clickable " onClick={() => handleClick("Mexico")}>
            <h1>Mexico</h1>
            {/* <p>This is on the right side of the image.</p> */}
          </div>
          <div className="col-3 col-style clickable" onClick={() => handleClick("Brazil")}>
            <h1>Brazil</h1>
            {/* <p>This is on the right side of the image.</p> */}
          </div>
          <div className="col-3 col-style clickable" onClick={() => handleClick("USA")}>
            <h1>USA</h1>
            {/* <p>This is on the right side of the image.</p> */}
          </div>
          <div className="col-3 col-style clickable" onClick={() => handleClick("Deutschland")}>
            <h1>Deutschland</h1>
            {/* <p>This is on the right side of the image.</p> */}
          </div>
          </div>
        ) : (
          <div className="row row-LandingPage">
            {activeSide === "Tunis" && (
              <>
              <div className="col-3 col-3-new-content new-content clickable" onClick={()=>{}}>
              <Link className='' to="/CofatItServices"> <h2>Cofat It services Tunis </h2></Link>

                {/* <p>This appears after clicking the left column.</p> */}
              </div>
              <div className="col-3 col-3-new-content new-content">
                <h2>Cofat Backoffice Tunis </h2>
                {/* <p>This appears after clicking the left column.</p> */}
              </div>
              <div className="col-3 col-3-new-content new-content">
                <h2>Cofat D&D Tunis </h2>

                {/* <p>This appears after clicking the left column.</p> */}
              </div>
              <div className="col-3 col-3-new-content new-content">
                <h2>Cofat Mateur</h2>
                {/* <p>This appears after clicking the left column.</p> */}
              </div>
               <div className="col-3 col-3-new-content new-content">
                <h2>Cofat Kairaouan</h2>
                {/* <p>This appears after clicking the left column.</p> */}
              </div>
              </>
              
            )}
            {activeSide === "Egypt" && (
              <div className="col-3 col-3-new-content new-content">
                <h2>New Content from Right Side</h2>
                <p>This appears after clicking the right column.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  
</>

    
        
      
    </>
  )
}

export default LandingPage
