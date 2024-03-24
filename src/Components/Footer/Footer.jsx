import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Art-Vista</p>
      </div>
      <ul className="footer-links">
        <li>About</li>
        <li>Products</li>
        <li>Contact Number</li>
      </ul>
    </div>
  );
};

export default Footer;
