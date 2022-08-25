import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import TextMobileStepper from "./carousalFunction/TextMobileStepper";
import moneybag from "../assets/homepage/money-bag.gif";
import handshake from "../assets/homepage/handshake.gif";
import idea from "../assets/homepage/idea.gif";
import like from "../assets/homepage/like.gif";
import Footer from "../components/Footer/index.js";
import { useNavigate } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

function Home(){
  let navigate = useNavigate();

  const redirectToFilter = (e) =>{
    console.log(e.target.textContent);
    navigate(`/search?tag=${e.target.textContent}`)
  }

  const renderExams = (nameList) => {
    return (
      <>
        {nameList.map((val, index) => (
          <div className="content-box" key={`exam_${val}_${index}`} onClick={redirectToFilter}>
            <p className="primarytext">{val.toUpperCase()}</p>
          </div>
        ))
        }
      </>
    )
  }

  return (
    <div className="flex-column">
      <div className="parent-div">
        <TextMobileStepper />
        <div
          style={{
            marginLeft: "1.5vw",
            marginRight: "1.5vw",
            marginBottom: "4vh",
          }}
        >
          <div className="flex-row" style={{ justifyContent: "space-between" }}>
            { renderExams([ "CAT", "IIT-JEE", "GATE" ]) }
          </div>
          <div
            className="flex-row"
            style={{ justifyContent: "space-between", marginTop: "4vh" }}
          > 
            { renderExams([ "GRE", "NEET", "GMAT" ]) }
          </div>
        </div>
        <div style={{ marginLeft: "1.5vw" }} className="informations">
          <div className="flex-column">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2vh",
              }}
            >
              <p className="primarytext">Our Services</p>
            </div>
            <div
              className="flex-row"
              style={{
                justifyContent: "space-between",
                marginLeft: "2vw",
                marginRight: "2vw",
                marginTop: "5vh",
              }}
            >
              <div className="flex-column" style={{ alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#fcae1e",
                    borderRadius: "4vw",
                    padding: "0.8vw",
                  }}
                >
                  <img src={moneybag} alt="earn-gif" style={{ width: "5vw" }} />
                </div>
                <p className="secondarytext">Earn as you go</p>
              </div>
              <div className="flex-column" style={{ alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#fcae1e",
                    borderRadius: "4vw",
                    padding: "0.8vw",
                  }}
                >
                  <img src={idea} alt="earn-gif" style={{ width: "5vw" }} />
                </div>
                <p className="secondarytext">Competative Best Mock Papers</p>
              </div>{" "}
              <div className="flex-column" style={{ alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#fcae1e",
                    borderRadius: "4vw",
                    padding: "0.8vw",
                  }}
                >
                  <img src={like} alt="earn-gif" style={{ width: "5vw" }} />
                </div>
                <p className="secondarytext">Optimised Solutions</p>
              </div>{" "}
              <div className="flex-column" style={{ alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#fcae1e",
                    borderRadius: "4vw",
                    padding: "0.8vw",
                  }}
                >
                  <img
                    src={handshake}
                    alt="earn-gif"
                    style={{ width: "5vw" }}
                  />
                </div>
                <p className="secondarytext">Industry Best Educators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
