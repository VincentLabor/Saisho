import React from "react";
import UseReducerComponent from "./aniReducerTypescript";


const LandingPage = () => {
  return (
    <>
      <div className="landing">
        <h3 className="centerText">Search and find your favorite anime/manga</h3>
        <UseReducerComponent/>
        {/* Carousel for Anime */}
      </div>
      <div className="trendingAnime"></div>
     <div className="trendingManga"></div>
     <div className="News"></div>
    </>
  );
};

export default LandingPage;
