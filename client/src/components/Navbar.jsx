import React from "react";
import "./Navbar.css";
import email from "../assets/email.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="nav-img" src={email} alt="" />
    </div>
  );
};

export default Navbar;
