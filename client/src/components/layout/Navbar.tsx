import React from "react";
import logoImage from "./Logo.png";

const Navbar = () => {
  return (
    <>
      <a href="/">
        <img src={logoImage} alt="" className="logo" />
      </a>
    </>
  );
};

export default Navbar;
