import axios from "axios";
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN } from "./types";

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/users/signin", data);

      console.log("res", res);
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email or Password is incorrect",
      });
      console.log("err", err);
    }
  };
};

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:5000/users/oauth/google", {
      access_token: data,
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });

    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/users/signup", data);

      console.log("res", res);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email already in use",
      });
      console.log("err", err);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });
  };
};
