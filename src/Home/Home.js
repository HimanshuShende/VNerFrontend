import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import TextMobileStepper from "./carousalFunction/TextMobileStepper";
import moneybag from "../assets/homepage/money-bag.gif";
import handshake from "../assets/homepage/handshake.gif";
import idea from "../assets/homepage/idea.gif";
import like from "../assets/homepage/like.gif";
import Footer from '../components/Footer/index.js'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export class Home extends Component {
  render() {
    return (
      // <div>
      //   <br></br>

      //   <Box
      //     sx={{
      //       display: "grid",
      //       justifyContent: "center",
      //       flexWrap: "wrap",
      //       "& > :not(style)": {
      //         m: 1,
      //         width: 1000,
      //         height: 128,
      //       },
      //     }}
      //   >
      //     <Paper elevation={3} style={{ backgroundColor: "#1FAA59" }}>
      //       <Typography
      //         style={{ fontSize: "20px" }}
      //         variant="body2"
      //         color="textPrimary"
      //         component="span"
      //       >
      //         CRACK ANY EXAM WITH INDIA'S FIRST GAMING PLATFORM
      //       </Typography>
      //     </Paper>
      //   </Box>

      //   <br></br>
      //   <br></br>

      //   <Box sx={{ flexGrow: 1 }}>
      //     <Grid container justifyContent="center" spacing={12}>
      //       <Grid item xs={6} md={4}>
      //         <Paper
      //           sx={{
      //             height: 140,
      //             width: 100,
      //             backgroundColor: "#E5D68A",
      //           }}
      //         >
      //           <Typography
      //             style={{ fontSize: "20px" }}
      //             variant="body2"
      //             color="textPrimary"
      //             component="span"
      //           >
      //             CAT
      //           </Typography>
      //         </Paper>
      //       </Grid>
      //       <Grid item xs={6} md={4}>
      //         <Paper
      //           sx={{
      //             height: 140,
      //             width: 100,
      //             backgroundColor: "#E5D68A",
      //           }}
      //         >
      //           <Typography
      //             style={{ fontSize: "20px" }}
      //             variant="body2"
      //             color="textPrimary"
      //             component="span"
      //           >
      //             IIT
      //           </Typography>
      //         </Paper>
      //       </Grid>
      //       <Grid item xs={6} md={4}>
      //         <Paper
      //           sx={{
      //             height: 140,
      //             width: 100,
      //             backgroundColor: "#E5D68A",
      //           }}
      //         >
      //           <Typography
      //             style={{ fontSize: "20px" }}
      //             variant="body2"
      //             color="textPrimary"
      //             component="span"
      //           >
      //             GATE
      //           </Typography>
      //         </Paper>
      //       </Grid>
      //       <Grid item xs={6} md={4}>
      //         <Paper
      //           sx={{
      //             height: 140,
      //             width: 100,
      //             backgroundColor: "#E5D68A",
      //           }}
      //         >
      //           <Typography
      //             style={{ fontSize: "20px" }}
      //             variant="body2"
      //             color="textPrimary"
      //             component="span"
      //           >
      //             GRE
      //           </Typography>
      //         </Paper>
      //       </Grid>
      //       <Grid item xs={6} md={4}>
      //         <Paper
      //           sx={{
      //             height: 140,
      //             width: 100,
      //             backgroundColor: "#E5D68A",
      //           }}
      //         >
      //           <Typography
      //             style={{ fontSize: "20px" }}
      //             variant="body2"
      //             color="textPrimary"
      //             component="span"
      //           >
      //             NEET
      //           </Typography>
      //         </Paper>
      //       </Grid>
      //       <Grid item xs={6} md={4}>
      //         <Paper
      //           sx={{
      //             height: 140,
      //             width: 100,
      //             backgroundColor: "#E5D68A",
      //           }}
      //         >
      //           <Typography
      //             style={{ fontSize: "20px" }}
      //             variant="body2"
      //             color="textPrimary"
      //             component="span"
      //           >
      //             QUIZ
      //           </Typography>
      //         </Paper>
      //       </Grid>
      //     </Grid>
      //   </Box>

      //   <br></br>
      //   <br></br>

      //   <Box
      //     sx={{
      //       display: "grid",
      //       justifyContent: "center",
      //       flexWrap: "wrap",
      //       "& > :not(style)": {
      //         m: 1,
      //         width: 1000,
      //         height: 128,
      //       },
      //     }}
      //   >
      //     <Paper
      //       elevation={3}
      //       style={{ backgroundColor: "#1FAA59", padding: "50px" }}
      //     >
      //       <Typography
      //         style={{ fontSize: "20px" }}
      //         variant="body2"
      //         color="textPrimary"
      //         component="span"
      //       >
      //         Games which help you
      //         <br></br>
      //         <br></br>
      //         <Grid
      //           container
      //           rowSpacing={1}
      //           columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      //         >
      //           <Grid xs={6}>Earn</Grid>
      //           <Grid xs={6}>Practice best mock papers</Grid>
      //           <Grid xs={6}>Get solutions of mock papers</Grid>
      //           <Grid xs={6}>Get papers from best educators</Grid>
      //         </Grid>
      //       </Typography>
      //     </Paper>
      //   </Box>
      // </div>
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
            <div
              className="flex-row"
              style={{ justifyContent: "space-between" }}
            >
              <div className="content-box">
                <p className="primarytext">CAT</p>
              </div>
              <div className="content-box">
                <p className="primarytext">IIT-JEE</p>
              </div>
              <div className="content-box">
                <p className="primarytext">GATE</p>
              </div>
            </div>
            <div
              className="flex-row"
              style={{ justifyContent: "space-between", marginTop: "4vh" }}
            >
              <div className="content-box">
                <p className="primarytext">GRE</p>
              </div>
              <div className="content-box">
                <p className="primarytext">NEET</p>
              </div>
              <div className="content-box">
                <p className="primarytext">GMAT</p>
              </div>
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
                    <img
                      src={moneybag}
                      alt="earn-gif"
                      style={{ width: "5vw" }}
                    />
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
        <Footer/>
      </div>
    );
  }
}

export default Home;
