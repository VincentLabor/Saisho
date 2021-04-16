import React, { useReducer } from "react";

const initialState = {
  anime: "",
  manga: "",
};

type ACTIONTYPES =
  | { type: "grabAnime"; payload: string }
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

function useReducerComponent() {
  const [state, dispatch] = useReducer(retrieveReducer, initialState);

  return (
    <div>
      <p>What anime is it?</p>
      <input type="Search for an anime" />
      <button
        onClick={() => {
          dispatch({ type: "grabAnime", payload: "Naruto" });
        }}
      >
        Click me!
      </button>
      <p>{state.anime}</p>
    </div>
  );
}

export default useReducerComponent;
