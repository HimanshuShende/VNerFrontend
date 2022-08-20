import React, { Component } from "react";
import "./index.css";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export class Home extends Component {
  render() {
    return (
     
      <div className="parent">
      <div style={{marginLeft:"2vw",marginRight:"2vw",marginBottom:"4vh",marginTop:"5vh"}}>
        <div className="flex-row">
        <div className="flex-column">
        <p className="bold-text">VNER</p>
        <p className="primary-text" style={{width:"20vw"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida purus nunc, non tempus eros luctus in. Suspendisse vulputate accumsan aliquet. In posuere, enim vel gravida sagittis, lacus urna ullamcorper velit, vitae posuere eros tellus finibus est. </p>
        </div>
            <div className="flex-column"  style={{marginLeft:"8vw"}}> 
                <p className="bold-text">Company Name</p>
                <p className="primary-text">About Us</p>
                <p className="primary-text">Blogs</p>
                <p className="primary-text">Partner Us</p>
                <p className="primary-text">Terms and Conditions</p>
            </div>
            <div className="flex-column" style={{marginLeft:"8vw"}}>
                <p className="bold-text">Courses</p>
                <p className="primary-text">CAT</p>
                <p className="primary-text">IIT</p>
                <p className="primary-text">GATE</p>
                <p className="primary-text">GRE</p>
                <p className="primary-text">GMAT</p>
            </div>
            <p style={{marginLeft:"15vw",fontSize:"5vw",color:"white",marginTop:"5vh"}}>LOGO</p>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;
