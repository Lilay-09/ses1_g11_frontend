import React, { createContext, useEffect, useReducer } from "react";

import cookie from "js-cookie";
import { isUserAuthenticated } from "../utils/isUserAuthenicated";
import { useRouter } from "next/router";
import { reducer } from "./reducer";
export const DataContext = createContext();
export const GlobalState = (props) => {
  const router = useRouter();
  const initialState = {
    auth: {},
    notify: {},

    //** initial modal actions */
    modal: {
      add: false,
      update: false,
      delete: false,
    },
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("__auth__login__");
    const token = cookie.get("__auth__login__");
    // if (isAuth) {
    //   const res = postData("auth/check", { token: `${token}` });
    //   if (res.status_code != 200)
    //     return localStorage.removeItem("__auth__login__");
    //   dispatch({
    //     type: "AUTH",
    //     payload: { user: res.user, token: token },
    //   });
    // }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};
