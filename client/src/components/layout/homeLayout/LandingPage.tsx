import React from "react";
import UseReducerComponent from "./aniReducerTypescript";
import animeId from "./aniReducerTypescript"


const LandingPage = (animeId: any) => {

  
  return (
    <>
      <div className="landing">
        {/* <h3 className="centerText">Search and find your favorite anime/manga</h3> */}
        <h3 className={animeId === "" ? "centerText":"displayNone"}>Search and find your favorite anime/manga</h3>
        <UseReducerComponent/>
        {/* Carousel for Anime */}
        <p>KEKW</p>
      </div>
      <div className="trendingAnime"></div>
     <div className="trendingManga"></div>
     <div className="News"></div>
    </>
  );
};

export default LandingPage;
