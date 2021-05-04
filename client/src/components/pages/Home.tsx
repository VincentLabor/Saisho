import React from "react";
import Navbar from "../layout/Navbar";
import LandingPage from "../layout/homeLayout/LandingPage";

const Home = () => {
  return (
    <>
      <div className="homePage">
        <Navbar />
        <LandingPage />
      </div>
    </>
  );
};

export default Home;
