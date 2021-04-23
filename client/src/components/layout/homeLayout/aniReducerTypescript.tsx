import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  anime: "",
  manga: "",
};

type ACTIONTYPES =
  | { type: "grabAnime"; payload: any }
  | { type: "grabManga"; payload: any }
  | { type: "clear"; payload: any };

function retrieveReducer(state: typeof initialState, action: ACTIONTYPES) {
  switch (action.type) {
    case "grabAnime":
      return {
        ...state,
        anime: action.payload,
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

const searchAnime = async (e: React.FormEvent<HTMLInputElement>) => {
  //write a function that accesses the api.

  const config = {
    headers: {},
  };

  try {
    const res = await axios.post("http://localhost:5000/", {
      aniNumber: {}
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

function useReducerComponent() {
  //<This is the type>
  //Parenthesees afterwards is the current value state will be initialized at.
  const [anime, setAnime] = useState<any>("");
  const [state, dispatch] = useReducer(retrieveReducer, initialState);

  return (
    <div>
      <p>What anime is it?</p>
      
      <form>
        <input
        className="animInput"
          type="text"
          placeholder="Search for an Anime"
          onChange={(e) => setAnime(e.target.value)}
          value={anime}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
       dispatch({type: "grabAnime", payload: searchAnime(anime)})     ;
          }}
        >
          Click me!
        </button>
      </form>
      <p>{}</p>
    </div>
  );
}

export default useReducerComponent;
