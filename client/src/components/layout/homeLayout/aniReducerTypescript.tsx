import React, { useReducer, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  redirect,
} from "react-router-dom";
import axios from "axios";
import { isTemplateSpan } from "typescript";
// import aniReducerStyle from "../homeLayout/aniReducer.Module.css"
import styles from "./aniReducer.module.css";
import { Redirect } from "react-router";

const initialState = {
  anime: "",
  animeId: "",
  search:false,
  animeURL: "",
  manga: "",
};

type ACTIONTYPES =
  | { type: "grabAnime"; payload: any }
  | { type: "grabAnimeId"; payload: any }
  | { type: "grabSearching"; payload: boolean}
  | { type: "grabAnimeURL"; payload: any }
  | { type: "grabManga"; payload: any }
  | { type: "clear"; payload: any };

function retrieveReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "grabAnime":
      return {
        ...state,
        anime: action.payload,
      };
    case "grabAnimeId":
      return {
        ...state,
        animeId: action.payload,
      };
    case "grabSearching":
      return{
        ...state,
        search: action.payload
      }
    case "grabAnimeURL":
      return {
        ...state,
        animeURL: action.payload,
      };
    case "grabManga":
      return {
        ...state,
        manga: action.payload,
      };
    case "clear":
      return {
        ...state,
        anime: "",
        manga: "",
      };
    default:
      throw new Error("Bad Action");
  }
}

function UseReducerComponent() {
  //<any> refers to the type.
  //Parenthesees afterwards is the current value state will be initialized at.
  const [anime, setAnime] = useState<any>("");
  //This state here is used to manage the input form for the users.
  const [state, dispatch] = useReducer(retrieveReducer, initialState);

  const regexer = (text: any) => {
    return text.replace(/ /g, "_");
  };

  //This function accesses the server with user inputted params.
  const searchAnime = async (e: React.FormEvent<HTMLInputElement>) => {
   
    try {
      dispatch({type: "grabSearching", payload: !state.search});
      const res = await axios.get(`http://localhost:5000/`, {
        //This is the users parameter
        //Before we send parameters, we have to pass them through regex.
        
        params: {
          id: e,
        },
      });
      console.log(e);
      //The proper id should be getting passed.
      //This sends this to the global state to be used.
      //Also putting data here errors out so put data in the global state.
      dispatch({ type: "grabAnime", payload: res.data.results });
      // dispatch({ type: "grabAnimeImage", payload: res.data.results });
    } catch (err) {
      console.log(err);
    }
  };
  const searchAnimeAndRedirect = async (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    try {
      const res = await axios.get(`http://localhost:5000/`, {
        //This is the users parameter
        //Before we send parameters, we have to pass them through regex.

        params: {
          id: e,
        },
      });

      //The proper id should be getting passed.
      //This sends this to the global state to be used.
      //Also putting data here errors out so put data in the global state.
      dispatch({ type: "grabAnime", payload: res.data.results });
      // dispatch({ type: "grabAnimeImage", payload: res.data.results });
    } catch (err) {
      console.log(err);
    }
  };

  const getSpecificAnime = async (retAnimeId: any) => {
    console.log(retAnimeId.mal_id);
    //Here create or dispatch a method that searches sepcifically for the animes with id.

    try {
      dispatch({type: "grabSearching", payload: !state.search});
      const res = await axios.get(`http://localhost:5000/anime`, {
        params: {
          id: retAnimeId.mal_id,
        },
      });

      dispatch({ type: "grabAnimeId", payload: res.data });
      dispatch({ type: "clear", payload: "" });
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
    return " ";
  };

  return (
    <>
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
                console.log(anime);

                searchAnime(anime);
                // (state.animeId == ""
                //   ? searchAnime(anime)
                //   : searchAnimeAndRedirect(anime))
              
              // e.preventDefault();
              // //Write or call a function that clears the global state.
              // {searchAnime(anime)}
            }}
          >
            Click me!
          </button>
        </form>
        <div className="searchResult">
          <div className={state.animeId && state.search == false ? "displayNone" : styles.animeItem}>
            {/* animeItem causes the item below to become flex */}
            {state.anime
              ? state.anime.slice(0, 3).map((item: any) => {
                  return (
                    <>
                      <Router>
                        <Link
                          to={`/${regexer(item.title)}`}
                          className="removeUnderline"
                        >
                          {/* <Link to={`/${item.title}`}></Link> */}
                          {/* Link works, need to regex the spaces to become underscores */}

                          {/* Having a Div here causes all items not to be flex */}
                          <div
                            className={styles.animeItems}
                            onClick={() => {
                              getSpecificAnime(item);
                            }}
                          >
                            <img
                              key={item.image_url}
                              src={item.image_url}
                              alt=" "
                              className={styles.animeImageResults}
                            />
                            <p className="smallerText" key={item.title}>
                              {item.title}
                            </p>
                          </div>
                        </Link>
                      </Router>
                    </>
                  );
                })
              : null}
          </div>
          <div className={state.animeId && state.search == false  ? "displayNone" : styles.animeItem}>
            {state.anime
              ? state.anime.slice(3, 6).map((item: any) => {
                  return (
                    <>
                      <Router>
                        {/* This link acts as a href */}
                        <Link
                          to={`/${regexer(item.title)}`}
                          className="removeUnderline"
                        >
                          <div
                            className={styles.animeItems}
                            onClick={() => {
                              getSpecificAnime(item);
                            }}
                          >
                            <img
                              key={item.image_url}
                              src={item.image_url}
                              alt=" "
                              className={styles.animeImageResults}
                            />
                            <p className="smallerText" key={item.title}>
                              {item.title}
                            </p>
                          </div>
                        </Link>
                      </Router>
                    </>
                  );
                })
              : null}
          </div>

          {/* This will display the anime that the user clicks on based on the search page */}
          {state.animeId ? (
            <div className={styles.userSearchedResult + " " + "width100"}>
              <h2 className="centerText">{state.animeId.title}</h2>
              {/* <p className="centerText jpnNameFontSize">{state.animeId.title_japanese}</p> */}
              <p className={styles.jpnNameFontSize + " " + `centerText`}>
                {state.animeId.title_japanese}
              </p>
              <p className={"centerText" + " " + styles.yellowText}>
                Score: {state.animeId.score}
              </p>
              <div className="contentBox centerFlex">
                {" "}
                <img
                  src={state.animeId.image_url}
                  alt=""
                  className={styles.displayAnime}
                  onClick={() => {
                    return (
                      <iframe
                        title={" "}
                        width="90%"
                        height="200"
                        src={state.animeId.trailer_url}
                      ></iframe>
                    );
                  }}
                />
                <div className="minorDetails left1padding">
                  <p>Aired: {state.animeId.aired.string}</p>
                  <p>Episodes: {state.animeId.episodes}</p>
                  <p>Status: {state.animeId.status}</p>
                  <p>
                    {state.animeId.related.Prequel
                      ? "Prequel:" + state.animeId.related.Prequel[0].name
                      : null}
                  </p>
                  <p>
                    {state.animeId.related.Sequel
                      ? "Sequel:" + state.animeId.related.Sequel[0].name
                      : null}
                  </p>
                </div>
              </div>
              <h3>Synopsis</h3>
              <p className={styles.silvertext}>{state.animeId.synopsis}</p>
              <div>
                <ul className="centerFlexSpaceEvenly">
                  <li>About</li>
                  <li>Reviews</li>
                  <li>Reccomendations</li>
                  <li>Themes</li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default UseReducerComponent;
