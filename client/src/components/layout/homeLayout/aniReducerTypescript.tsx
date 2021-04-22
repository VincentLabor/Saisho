import React, { useReducer } from "react";
import axios from "axios";

const initialState = {
  anime: "",
  manga: "",
};

type ACTIONTYPES =
  | { type: "grabAnime"; payload: any }
  | { type: "grabManga"; payload: string }
  | { type: "clear"; payload: null };

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
    const res = await axios.get("http://localhost:5000/", config);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

function useReducerComponent() {
  const [state, dispatch] = useReducer(retrieveReducer, initialState);

  return (
    <div>
      <p>What anime is it?</p>
      {/* <input type="Search for an anime" onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{}/> */}
      <form>
        <input
          type="text"
          placeholder="Search for an Anime"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            // searchAnime(e);
            // dispatch({type:"grabAnime", payload: e})
            // console.log(state.anime)
          }}
          value={state.anime}
        />
        <button
          type="submit"
          // onClick={(e) => {
          //   e.preventDefault();
          //   findAnime();
          //a function that encompasses the grab anime dispatch
          // dispatch({ type: "grabAnime", payload: "Naruto" });
          // }}
        >
          Click me!
        </button>
      </form>

      <p></p>
    </div>
  );
}

export default useReducerComponent;
