import { useEffect, useReducer, useState } from "react";
import { getApi } from "./config";

function showsReducer(prevState, action) {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.showId];
    }
    case "REMOVE": {
      return prevState.filter((showId) => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = "lastQuery") {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : "";
  });

  const setPersisteedInput = (newInput) => {
    setInput(newInput);
    sessionStorage.setItem(key, JSON.stringify(input));
  };

  return [input, setPersisteedInput];
}

//-------------------------
const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { ...prevState, isLoading: false, show: action.show, error: null };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

export function useShow(id) {
  /*
   * useReducer takes 2 parameters, a reducer and an initial state and it returns a state and dispatch.
   * Dispatch is used to call the reducer function.
   * Whenever we call the reducer function by dispatch, we always have to mention the type of action, which will be checked inside the reducer that which action has to be done.
   * The remaining part except the action type, is used as action.<that name>
   * Action type nothing but the command for doing which action with the current state.
   */
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  const { show, isLoading, error } = state;

  useEffect(() => {
    let isMounted = true;

    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_SUCCESS",
            show: results,
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_FAILED",
            error: err.message,
          });
        }
      });

    /* return is called first when the state is unmounted, which make the isMounted false and the api fetch will not be executed. Otherwise it'll fetch the api unnecessarily even after closing or going back from that page.
    NOTE that, always the return will be called first and then whatever asynchornous call done inside the useEffect callback function
    */
    return () => {
      isMounted = false;
    };
  }, [id]);

  return state;
}
