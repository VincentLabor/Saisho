import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  anime: "",
  animeImage: "",
  manga: "",
};

type ACTIONTYPES =
  | { type: "grabAnime"; payload: any }
  | { type: "grabPageOfAnime"; payload: any }
  | { type: "grabAnimeImage"; payload: any }
  | { type: "grabManga"; payload: any }
  | { type: "grabMangaImage"; payload: any }
  | { type: "clear"; payload: any };

function retrieveReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "grabAnime":
      return {
        ...state,
        anime: action.payload,
      };
    case "grabAnimeImage":
      return {
        ...state,
        animeImage: action.payload.slice(0, 5).map((item: any) => {
          return item.image_url;
        }),
      };
    case "grabManga":
      return {
        ...state,
        manga: action.payload,
      };
    case "clear":
      return {
        ...state,
        anime: " ",
        manga: "",
      };
    default:
      throw new Error("Bad Action");
  }
}

function useReducerComponent() {
  //<any> refers to the type.
  //Parenthesees afterwards is the current value state will be initialized at.
  const [anime, setAnime] = useState<any>("");
  //This state here is used to manage the input form for the users.
  const [state, dispatch] = useReducer(retrieveReducer, initialState);

  const regexer = (text: any) => {
    return text.replace(/ /g, "%20");
  };

  //This function accesses the server with user inputted params.
  const searchAnime = async (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const res = await axios.get(`http://localhost:5000/`, {
        //This is the users parameter
        //Before we send parameters, we have to pass them through regex.

        params: {
          id: e,
        },
      });
      console.log(res.data.results);
      //This sends this to the global state to be used.
      //Also putting data here errors out so put data in the global state.
      dispatch({ type: "grabAnime", payload: res.data.results });
      // dispatch({ type: "grabAnimeImage", payload: res.data.results });
    } catch (err) {
      console.log(err);
    }
  };

  // const renderTitleResults =(results: any)=>{
  //   const resonses = results;
  //   return resonses.slice(0, 5).map((item: any)=>{
  //     return item.title;
  //   })
  // }

  return (
    <div>
      <form>
        <input
          className="animInput"
          type="text"
          placeholder="Search for an Anime"
          onChange={(e) => setAnime(e.target.value)}
          //The value here is shown on front end and also us managed by local state above.
          value={anime}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            //Write or call a function that clears the global state.
            searchAnime(anime);
          }}
        >
          Click me!
        </button>
      </form>
      <div className="searchResult">
        {/* <img
            src={`${state.animeImage}`}
            alt=""
            
          /> */}
        <div className="animeItem">
          {/* animeItem causes the item below to become flex */}
          {state.anime
            ? state.anime.slice(0, 3).map((item: any) => {
                return (
                  <>
                  {/* Having a Div here causes all items not to be flex */}
                    <div className="animeItems">
                      <img
                        key={item.image_url}
                        src={item.image_url}
                        alt=" "
                        className="animeImageResults"
                      />
                      <p className="smallerText" key={item.title}>
                        {item.title}
                      </p>
                    </div>
                  </>
                );
              })
            : null}
        </div>
        <div className="animeItem">
          {/* animeItem causes the item below to become flex */}
          {state.anime
            ? state.anime.slice(3, 6).map((item: any) => {
                return (
                  <>
                  {/* Having a Div here causes all items not to be flex */}
                    <div className="animeItems">
                      <img
                        key={item.image_url}
                        src={item.image_url}
                        alt=" "
                        className="animeImageResults"
                      />
                      <p className="smallerText" key={item.title}>
                        {item.title}
                      </p>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default useReducerComponent;
