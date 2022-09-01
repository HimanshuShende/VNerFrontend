import React, { Component } from "react";
import "./index.css";
import axios from "axios";
import { Icon } from '@iconify/react';
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export class Home extends Component {
  render() {
    return (

      <div className="footer" id="footer">
      {/* <div className="subscribe-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="subscribe-box">
                  <form action="#">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="heading-area">
                        <h5 className="sub-title">
                            subscribe to Dooplo
                        </h5>
                        <h4 className="title">
                            To Get Exclusive Benefits
                        </h4>
                    </div>
                  </div>
                  <div className="col-lg-3 col-4 d-flex align-self-center">
                    <div className="icon">
                      <img src="assets/images/mail-box.png" alt=""/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-8 d-flex align-self-center">
                    <div className="form-area">
                        <input type="text" placeholder="Your Email Address"/>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-self-center">
                    <div className="button-area">
                      <button className="mybtn1" type="submit">Subscribe
                        <span><Icon icon="fe:paper-plane" /></span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget info-link-widget">
              <h4 className="title">
                About 
              </h4>
              <ul className="link-list">
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />	About Us
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />	Contact Us
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />	Latest Blog
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />	Authenticity Guarantee
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />	Customer Reviews
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />	Privacy Policy
  
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget info-link-widget">
              <h4 className="title">
                My Account
              </h4>
              <ul className="link-list">
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" /> Manage Your Account
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" /> How to Deposit
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" /> How to Withdraw
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" /> Account Varification
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" /> Safety & Security
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" /> Membership Level
  
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget info-link-widget">
              <h4 className="title">
                help center 
              </h4>
              <ul className="link-list">
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Help centre
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />FAQ
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Quick Start Guide
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Tutorials
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Borrow
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Lend
  
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="footer-widget info-link-widget">
              <h4 className="title">
                Legal Info
              </h4>
              <ul className="link-list">
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Risk Warnings
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Privacy Notice
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Security
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Become Affiliate
                  </a>
                </li>
                <li>
                  <a href="#">
                  <Icon icon="la:angle-double-right" />Complaints Policy
  
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="left-area">
                <p>Copyright © 2022.All Rights Reserved By <a href="#">VNER</a>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <ul className="copright-area-links">
                <li>
                  <a href="#">Terms Of Use</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Gamble</a>
                </li>
                <li>
                  <a href="#">Aware</a>
                </li>
                <li>
                  <a href="#">Help Cente</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div> 
    );
  }
}

export default Home;
