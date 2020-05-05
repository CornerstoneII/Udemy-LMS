import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
// import axios from "axios";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import reducers from "./reducers";
import "./App.scss";

import authGuard from "./components/HOCs/AuthGuard";

const jwtToken = localStorage.getItem("JWT_TOKEN");
ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false,
        },
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

serviceWorker.unregister();
