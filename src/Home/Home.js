import React, { Component } from "react";
import "./Home.css";
import axios from "axios";
import TextMobileStepper from "./carousalFunction/TextMobileStepper";
import Footer from "../components/Footer/index.js";
import heroImg from "../assets/images/heroarea.png";
import CarousalCard from "./cardCarousal/index";
import one from "../assets/images/feature/icon1.png";
import two from "../assets/images/feature/icon2.png";
import three from "../assets/images/feature/icon3.png";
import { Icon } from "@iconify/react";

import one1 from "../assets/images/funfact/icon1.png";
import two2 from "../assets/images/funfact/icon2.png";
import three3 from "../assets/images/funfact/icon3.png";

import getstart from "../assets/images/get-start.png"


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
const rawHTML = `
<style>
p {
  font-size: 18px;
  color: #a1aed4;
  line-height: 1.625;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto; }
.hero-area {
  position: relative;
  padding: 317px 0px 354px;
  position: relative;
  background: #070b28;
  overflow: hidden; }
  .hero-area .left-content {
    position: inherit;
    z-index: 9; }
    .hero-area .left-content .content .title {
      font-size: 70px;
      font-weight: 700;
      line-height: 70px;
      color: #FFF;
      text-transform: uppercase;
      margin-bottom: 13px;
      letter-spacing: -1px; }
    .hero-area .left-content .content .subtitle {
      font-size: 28px;
      line-height: 38px;
      font-weight: 600;
      margin-bottom: 10px;
      text-transform: uppercase;
      background: -webkit-linear-gradient(to left, #ff344d, #d2273c);
      background: -moz-linear-gradient(to left, #ff344d, #d2273c);
      background: -ms-linear-gradient(to left, #ff344d, #d2273c);
      background: -o-linear-gradient(to left, #ff344d, #d2273c);
      background: -webkit-gradient(linear, right top, left top, from(#ff344d), to(#d2273c));
      background: -webkit-linear-gradient(right, #ff344d, #d2273c);
      background: -o-linear-gradient(right, #ff344d, #d2273c);
      background: linear-gradient(to left, #ff344d, #d2273c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; }
    .hero-area .left-content .content .text {
      font-size: 28px;
      line-height: 38px;
      font-weight: 300;
      margin-bottom: 40px; }
  .hero-area .hero-img {
    position: relative;
    top: -50px; }
    .hero-area .hero-img .full-image {
      display: none; }
    .hero-area .hero-img .shape {
      position: absolute; }
      .hero-area .hero-img .shape.phone {
        top: -6px;
        left: 124px; }
      .hero-area .hero-img .shape.man {
        top: 157px;
        left: 213px;
        -webkit-animation: manAni 3s linear infinite;
        animation: manAni 3s linear infinite; }
      .hero-area .hero-img .shape.ripple {
        top: 132px;
        right: 70px;
        width: 85px;
        -webkit-animation: rippleAni 5s linear infinite;
        animation: rippleAni 5s linear infinite; }
      .hero-area .hero-img .shape.ripple2 {
        top: 142px;
        left: 10px;
        width: 100px;
        -webkit-animation: ripple2Ani 5s linear infinite;
        animation: ripple2Ani 5s linear infinite; }
      .hero-area .hero-img .shape.bitcoin1 {
        top: 220px;
        left: 25px;
        width: 100px;
        -webkit-animation: ripple2Ani 4s linear infinite;
        animation: ripple2Ani 4s linear infinite; }
      .hero-area .hero-img .shape.bitcoin2 {
        top: 46px;
        right: 55px;
        width: 92px;
        -webkit-animation: rippleAni 4s linear infinite;
        animation: rippleAni 4s linear infinite; }
      .hero-area .hero-img .shape.shape-icon {
        top: 112px;
        right: -3px;
        width: 55px; }
      .hero-area .hero-img .shape.award-bg {
        top: 178px;
        right: 26px; }
      .hero-area .hero-img .shape.award {
        top: 178px;
        right: 53px;
        width: 27px;
        -webkit-animation: shieldAni 3s linear infinite;
        animation: shieldAni 3s linear infinite; }
      .hero-area .hero-img .shape.gift-bg {
        top: 304px;
        left: 125px;
        width: 76px; }
      .hero-area .hero-img .shape.gift {
        top: 299px;
        left: 150px;
        width: 30px;
        -webkit-animation: shieldAni 4s linear infinite;
        animation: shieldAni 4s linear infinite; }
      .hero-area .hero-img .shape.shield-bg {
        top: 345px;
        left: 197px;
        width: 70px; }
      .hero-area .hero-img .shape.shield {
        top: 338px;
        left: 222px;
        width: 25px;
        -webkit-animation: shieldAni 4.5s linear infinite;
        animation: shieldAni 4.5s linear infinite; }
</style>
<div class="hero-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-5 d-flex align-self-center">
                <div class="left-content">
                    <div class="content">
                        <h5 class="subtitle">
                            New QUIZ Game
                        </h5>
                        <h1 class="title">
                                PLay To WIN
                        </h1>
                        <p class="text">
                                Play, Invest,Exchange and Join the
                                Contest with high rewards at VNER!	
                        </p>
                        <div class="links">
                            <a href="#" class="mybtn1 link1">Get Started Now!</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
`;
const FeatureGameHTML = `			
<style>
.section-heading {
  text-align: center; }
  .section-heading .subtitle {
    font-size: 24px;
    line-height: 34px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
    background: -webkit-linear-gradient(to left, #ff344d, #d2273c);
    background: -moz-linear-gradient(to left, #ff344d, #d2273c);
    background: -ms-linear-gradient(to left, #ff344d, #d2273c);
    background: -o-linear-gradient(to left, #ff344d, #d2273c);
    background: -webkit-gradient(linear, right top, left top, from(#ff344d), to(#d2273c));
    background: -webkit-linear-gradient(right, #ff344d, #d2273c);
    background: -o-linear-gradient(right, #ff344d, #d2273c);
    background: linear-gradient(to left, #ff344d, #d2273c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; }
    .section-heading .subtitle.extra-padding {
      margin-bottom: 17px; }
  .section-heading .title {
    font-size: 60px;
    line-height: 70px;
    font-weight: 700;
    text-transform: uppercase;
    color: #FFF;
    margin-bottom: 10px; }
    .section-heading .title.extra-padding {
      margin-bottom: 20px; }
  .section-heading .text {
    font-size: 24px;
    line-height: 34px;
    font-weight: 300; }

</style>
<div class="row justify-content-center">
<div class="col-lg-8 col-md-10">
  <div class="section-heading">
    <h5 class="subtitle">
        Try to check out our
    </h5> 
    <h2 class="title">
        featured games
    </h2>
    <p class="text">
        Check out our latest featured game! To meet today's challenges & earn cryptocurrency. Top 10 players receive prizes every hour!
    </p>
  </div>
</div>


</div>`;

export class Home extends Component {
  render() {
    return (
      <div className="flex-column" style={{ backgroundColor:  "#070b28"}}>
        <div className="parent-div">
          {/* <TextMobileStepper /> */}
          <div dangerouslySetInnerHTML={{ __html: rawHTML }}></div>
          <div
            style={{
              position: "absolute",
              height: "60vh",
              width: "50vw",
              marginTop: "-100vh",
              marginLeft: "45vw",
            }}
          >
            <div>
              <img src={heroImg} alt="hero-img" />
            </div>
            {/* <div className="hero-img d-none d-md-block">
                   <img className="img-fluid full-image" src="../assets/images/heroarea.png" alt=""/>
                   <img className="shape phone" src="../assets/images/h-shapes/phone.png" alt=""/>
                   <img className="shape man" src="../assets/images/h-shapes/man222.png" alt=""/>
                   <img className="shape ripple" src="../assets/images/h-shapes/ripple.png" alt=""/>
                   <img className="shape ripple2" src="../assets/images/h-shapes/ripple1.png" alt=""/>
                   <img className="shape bitcoin1" src="../assets/images/h-shapes/bitcoin1.png" alt=""/>
                   <img className="shape bitcoin2" src="../assets/images/h-shapes/bitcoin2.png" alt=""/>
                   <img className="shape shape-icon" src="../assets/images/h-shapes/shape.png" alt=""/>
                   <img className="shape award-bg" src="../assets/images/h-shapes/award/bg.png" alt=""/>
                   <img className="shape award" src="../assets/images/h-shapes/award/award.png" alt=""/>
                   <img className="shape gift-bg" src="../assets/images/h-shapes/giftbox/bg.png" alt=""/>
                   <img className="shape gift" src="../assets/images/h-shapes/giftbox/gift.png" alt=""/>
                   <img className="shape shield-bg" src="../assets/images/h-shapes/shield/bg.png" alt=""/>
                   <img className="shape shield" src="../assets/images/h-shapes/shield/shield.png" alt=""/>
               </div> */}
          </div>
          <div>
            <div className="features">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="feature-box">
                      <div className="feature-box-inner">
                        <div className="row">
                          <div className="col-lg-4 col-md-6">
                            <div className="single-feature">
                              <div className="icon one">
                                <img src={one} alt="" />
                              </div>
                              <div className="content">
                                <h4 className="title">Exclusive Offer</h4>
                                <a href="#" className="link">
                                  read more{" "}
                                  <Icon icon="gridicons:arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="single-feature">
                              <div className="icon two">
                                <img src={two} alt="" />
                              </div>
                              <div className="content">
                                <h4 className="title">Provably Fair</h4>
                                <a href="#" className="link">
                                  read more{" "}
                                  <Icon icon="gridicons:arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6">
                            <div className="single-feature">
                              <div className="icon three">
                                <img src={three} alt="" />
                              </div>
                              <div className="content">
                                <h4 className="title">24/7 Support</h4>
                                <a href="#" className="link">
                                  read more{" "}
                                  <Icon icon="gridicons:arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: FeatureGameHTML }}
            style={{ width: "98vw", position: "absolute", marginTop: "-7vh" }}
          ></div>
          <div className="card-carousal">
            <CarousalCard />
          </div>
        </div>
        <div className="funfact">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="single-fun">
                  <img src={one1} alt="" />
                  <div className="count-area">
                    <div className="count">93K</div>
                  </div>
                  <p>Players</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="single-fun">
                  <img src={two2} alt="" />
                  <div className="count-area">
                    <div className="count">99+</div>
                  </div>
                  <p>Games</p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="single-fun">
                  <img src={three3} alt="" />
                  <div className="count-area">
                    <div className="count">70+</div>
                  </div>
                  <p>Winners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="get-start" style={{marginTop:"10vh"}}>
        <div className="container">
			<div className="row">
				<div className="col-lg-7 d-flex align-self-center">
					<div className="left-area">
						<div className="section-heading">
							<h5 className="subtitle">
								every day lots of  wins
							</h5>
							<h2 className="title ">
									be one of them
							</h2>
							<p className="text">
									Get started in less than 5 min - no credit card 
									required.Gain early access to Dooplo and  experience crypto like never before. 
							</p>
							<a href="#" className="mybtn1">Play  Now!</a>
						</div>
					</div>
				</div>
				<div className="col-lg-5">
					<div className="right-image">
						<img src={getstart} alt=""/>
					</div>
				</div>
			</div>
		</div>
    </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
